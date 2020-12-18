//router
import { useRouter } from 'next/router'
// react hooks
import { useEffect, useState } from 'react'
// custom components
import Dashboard from '@components/Dashboard'
import SetGroups from '@components/DocumentManager/SetGroups'
import DocumentProcedure from '@components/DocumentManager/DocumentProcedure'
//material-ui components
import { Button, Paper, Grid, TableRow, TableContainer, TableCell, TableBody, Table } from '@material-ui/core'
//document-managaer interfaces
import { Document, DocumentStatus, Application, ApplicationStatus } from '@interfaces/document-manager'
//material-ui icons
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
//document-managaer REST APIS
import { documentAPI } from 'service/api'
//document-managaer styles
import useTranslation from 'hooks/useTranslation'
import { AppDispatch, RootState } from '@store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import {
  DELETE_NEW_APPLICATION_BY_ID,
  CHANGE_PAGE_NEW_APPLICATION,
  FETCH_NEW_APPLICATIONS,
} from '@store/document/types'
import { useStylesDocumentManger } from 'styles/document-manager-styles'
import Title from '@components/common/Title'
import { primaryText, approveStepColor, rejectStepColor } from '@utils/constants'

export default function DocumentMangerDetail() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [documentSetID, setDocumentSetID] = useState<string | null>(null)
  const [applicationID, setApplicationID] = useState('')
  const [applicationData, setApplicationData] = useState<Application | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const classes = useStylesDocumentManger()
  const { t } = useTranslation()

  const dispatch: AppDispatch = useDispatch()
  const state = useSelector((state: RootState) => {
    return {
      newApplication: state.document.newApplication,
      anyApplication: state.document.anyApplication,
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
      console.log(state)
      if (router.query.applications === 'any') {
        setApplicationData(state.anyApplication.applications.find((item) => item.applicationID === applicationID))
      } else {
        setApplicationData(state.newApplication.applications.find((item) => item.applicationID === applicationID))
      }

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
    if (router.query.applications && router.query.applications === 'new') {
      if (state.newApplication.applications.length > 0) {
        doneDocumentProcedure()
        router.push({
          pathname: '/document-manager/[id]',
          query: { id: state.newApplication.applications[0].applicationID, applications: router.query.applications },
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
                  router.push({
                    pathname: '/document-manager',
                    query: { applications: router.query.applications },
                  })
                }
              }
              setLoading(false)
            })
            .catch(() => {
              router.push({
                pathname: '/document-manager',
                query: { applications: router.query.applications },
              })
              setLoading(false)
            })
        } else {
          router.push({
            pathname: '/document-manager',
            query: { applications: router.query.applications },
          })
        }
      }
    }
  }, [state.newApplication.applications])

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
      {router.query.applications && router.query.applications === 'new' ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonDocument}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              router.push({
                pathname: '/document-manager',
                query: { applications: router.query.applications },
              })
            }}
          >
            {t('backToApplications')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonDocument}
            endIcon={<ArrowForwardIosIcon />}
            onClick={goNextApplication}
          >
            {t('nextApplication')}
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonDocument}
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              if (router.query.applications && router.query.applications === 'user-manager') {
                router.push({
                  pathname: '/user-manager/[id]',
                  query: { id: router.query.accountID, applications: router.query.applications },
                })
              } else {
                router.push({
                  pathname: '/document-manager',
                  query: { applications: router.query.applications },
                })
              }
            }}
          >
            {t('backToApplications')}
          </Button>
        </div>
      )}

      {applicationData && (
        <Grid item xs={4}>
          <TableContainer component={Paper} style={{ padding: 10, marginBottom: 10 }}>
            <Title> {t('applicationInfo')}</Title>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow key={applicationData.status}>
                  <TableCell align="left" width={150}>
                    {t('status')}:
                  </TableCell>
                  <TableCell
                    align="left"
                    style={
                      applicationData.status === ApplicationStatus.approved
                        ? { color: approveStepColor }
                        : applicationData.status === ApplicationStatus.rejected
                        ? { color: rejectStepColor }
                        : { color: primaryText }
                    }
                  >
                    {applicationData.status}
                  </TableCell>
                </TableRow>
                <TableRow key={applicationData.firstName}>
                  <TableCell align="left" width={150}>
                    {t('firstName')}:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {applicationData.firstName}
                  </TableCell>
                </TableRow>
                <TableRow key={applicationData.lastName}>
                  {' '}
                  <TableCell align="left" width={150}>
                    {t('lastName')}:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {applicationData.lastName}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

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
