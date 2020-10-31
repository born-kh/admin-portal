import { useRouter } from 'next/router'
import Dashboard from '@components/Dashboard'
import { useEffect, useState } from 'react'
import Title from '@components/common/Title'
import { Document } from '@interfaces/document-manager'
import * as documentManagerAPI from 'service/documentManagerAPI'
import SetGroups from '@components/DocumentManager/SetGroups'
import DocumentProcedure from '@components/DocumentManager/DocumentProcedure'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { documentAPI } from 'service/api'
export default function (props: any) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [documentSetID, setDocumentSetID] = useState<string | null>(null)
  const [applicationID, setApplicationID] = useState('')
  const [accountID, setAccountID] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const classes = useStyles()
  useEffect(() => {
    function loadData() {
      documentManagerAPI
        .fetchDocuments(applicationID)
        .then((documents) => {
          if (documents) {
            setDocuments(documents)
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
    <Dashboard>
      <Title>Application Info</Title>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <Button variant="contained" color="primary" startIcon={<ArrowBackIosIcon />} onClick={() => router.back()}>
            Back to Appllications
          </Button>
        </Box>
        <Box p={1}>
          <Button variant="contained" color="primary" endIcon={<ArrowForwardIosIcon />} onClick={goNextApplication}>
            Next Appllication
          </Button>
        </Box>
      </Box>
      {!documentSetID ? (
        <SetGroups documents={documents} isLoading={loading} handleSetID={(setID) => setDocumentSetID(setID)} />
      ) : (
        <DocumentProcedure
          documents={documents}
          applicationID={applicationID}
          handleDoneDocumentProcedure={doneDocumentProcedure}
          accountID={accountID}
          documentSetID={documentSetID}
        />
      )}
    </Dashboard>
  )
}
