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

export default function () {
  const [documents, setDocuments] = useState<Document[]>([])
  const [documentSetID, setDocumentSetID] = useState<string | null>(null)
  const [applicationID, setApplicationID] = useState('')
  const [accountID, setAccountID] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const classes = useStyles()
  const { t } = useTranslation()

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
        console.log(response)
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

  const goNextApplication = () => {
    setLoading(true)
    documentAPI
      .fetchApplications({ start: 1, count: 10 })
      .then((response) => {
        if (response.status === 200) {
          let applications = response.data.applications
          applications = applications.filter((item) => item.applicationID !== applicationID)
          console.log(applications)
          if (applications.length > 0) {
            router.push({
              pathname: '/document-manager/[id]',
              query: { id: applications[0].applicationID, accountID: applications[0].accountID },
            })
          } else {
            router.push('/document-manager')
          }
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (router.query.id) {
      setApplicationID(router.query.id as string)
    }

    if (router.query.accountID) {
      setAccountID(router.query.accountID as string)
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
          accountID={accountID}
          documentSetID={documentSetID}
        />
      )}
    </>
  )
}
