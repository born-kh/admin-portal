import { useRouter } from 'next/router'
import Dashboard from '@components/Dashboard'
import { useEffect, useState } from 'react'
import Title from '@components/common/Title'
import { Document } from '@interfaces/document-manager'
import * as documentManagerAPI from 'service/documentManagerAPI'
import SetGroups from '@components/DocumentManager/SetGroups'
export default function (props: any) {
  const [documents, setDocuments] = useState<Document[]>([])

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    function loadData() {
      documentManagerAPI
        .fetchDocuments(router.query.id as string)
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
    if (router.query.id) {
      loadData()
    }
  }, [router])

  return (
    <Dashboard>
      <Title>Application Info</Title>
      <SetGroups documents={documents} isLoading={loading} />
    </Dashboard>
  )
}
