//router
import { useRouter } from 'next/router'
// react hooks
import { useEffect, useState } from 'react'
// custom components
import Dashboard from '@components/Dashboard'
import SetGroups from '@components/DocumentManager/SetGroups'
import DocumentProcedure from '@components/DocumentManager/DocumentProcedure'
//material-ui components
import { Button } from '@material-ui/core'
//document-managaer interfaces
import { Document, DocumentStatus } from '@interfaces/document-manager'
//material-ui icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
//document-managaer REST APIS
import { documentAPI } from 'service/api'
//document-managaer styles
import { useStyles } from './styles'
import useTranslation from 'hooks/useTranslation'
import { AppDispatch, RootState } from '@store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import {
  DELETE_NEW_APPLICATION_BY_ID,
  CHANGE_PAGE_NEW_APPLICATION,
  FETCH_NEW_APPLICATIONS,
} from '@store/document/types'
import { fetchNewApplicationsAction } from '@store/document/actions'
import { stat } from 'fs'

export default function () {
  const [documents, setDocuments] = useState<Document[]>([])
  const [documentSetID, setDocumentSetID] = useState<string | null>(null)
  const [applicationID, setApplicationID] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation()

  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: RootState) => {
    return {
      newApplication: state.document.newApplication,
    }
  })

  useEffect(() => {
    function loadData() {
      documentAPI
        .fetchDocuments({ applicationID })
        .then((response) => {
          if (response.status === 200) {
            setDocuments(response.data.documents)
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
    if (applicationID) {
      loadData()
    }
  }, [applicationID])

  const deleteDocument = async (documentID: string) => {
    documentAPI
      .deleteDocument({ documentID })
      .then((response) => {
        setDocuments((prevDocumnet) => prevDocumnet.filter((item) => item.ID !== documentID))
      })
      .catch((e) => {
        console.log(e)
      })
  }
  const updateDocument = (typeID: string, documentSetID: string, status: DocumentStatus) => {
    setDocuments((prevDocumnet) =>
      prevDocumnet.map((item) => {
        if (item.documentType.ID === typeID && item.documenSet.ID === documentSetID) {
          return { ...item, status }
        }
        return item
      })
    )
  }

  useEffect(() => {
    if (state.newApplication.applications.length > 0) {
      router.push({
        pathname: '/document-manager/[id]',
        query: { id: state.newApplication.applications[0].applicationID },
      })
    } else {
      const start = (state.newApplication.page + 1) * state.newApplication.pageSize
      if (state.newApplication.totalCount > start) {
        setLoading(true)

        documentAPI
          .fetchApplications({
            start,
            count: state.newApplication.pageSize,
          })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.applications.length > 0) {
                dispatch({
                  type: CHANGE_PAGE_NEW_APPLICATION,
                  payload: { page: state.newApplication.page + 1, pageSize: state.newApplication.pageSize },
                })
                dispatch({ type: FETCH_NEW_APPLICATIONS, payload: { ...response.data } })
              } else {
                router.push('/document-manager')
              }
            }
            setLoading(false)
          })
          .catch(() => {
            router.push('/document-manager')
            setLoading(false)
          })
      } else {
        router.push('/document-manager')
      }
    }
  }, [state.newApplication])

  const goNextApplication = () => {
    dispatch({ type: DELETE_NEW_APPLICATION_BY_ID, payload: applicationID })
  }

  useEffect(() => {
    if (router.query.id) {
      setApplicationID(router.query.id as string)
    }
  }, [router])

  const doneDocumentProcedure = () => {
    setDocumentSetID(null)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonDocument}
          startIcon={<ArrowBackIosIcon />}
          onClick={() => router.back()}
        >
          {t('backToApplications')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          // style={router.pa  { }}
          className={classes.buttonDocument}
          endIcon={<ArrowForwardIosIcon />}
          onClick={goNextApplication}
        >
          {t('nextApplication')}
        </Button>
      </div>

      {!documentSetID ? (
        <SetGroups documents={documents} isLoading={loading} handleSetID={(setID) => setDocumentSetID(setID)} />
      ) : (
        <DocumentProcedure
          documents={documents}
          handleDeleteDocument={deleteDocument}
          handleUpdateDocument={updateDocument}
          applicationID={applicationID}
          handleNextApplication={goNextApplication}
          handleDoneDocumentProcedure={doneDocumentProcedure}
          documentSetID={documentSetID}
        />
      )}
    </>
  )
}
