import { useRouter } from 'next/router'
import Dashboard from '@components/Dashboard'
import { useEffect, useState } from 'react'
import Title from '@components/common/Title'
import { Grid } from '@material-ui/core'
import { SearchType, Account } from '@interfaces/user-manager'
import { useStyles } from './styles'
import AccountsSessions from '@components/AccountsSessions'
import AccountInfo from '@components/AccountInfo'
import { userAPI, documentAPI } from 'service/api'
import ApplicationTable from '@components/DocumentManager/ApplicationTable'
import { Application } from '@interfaces/document-manager'
import Loader from '@components/common/Loader'

export default function () {
  const classes = useStyles()
  const [account, setAcccount] = useState<Account | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoadingApplications, setIsLoadingApplications] = useState(false)

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    function loadData() {
      userAPI
        .searchUser([{ type: SearchType.accountID, search: router.query.id as string }])
        .then((accounts) => {
          if (accounts.length > 0) {
            setAcccount(accounts[0])
          }

          setLoading(false)
        })
        .catch((error) => {
          setLoading(false)
        })
    }
    if (router.query.id) {
      loadData()
    }
  }, [router])
  useEffect(() => {
    if (account) {
      documentAPI
        .fetchApplicationByAccount({ accountID: account.accountID })
        .then((response) => {
          if (response.status === 200) {
            setApplications(response.data.applications)
          }
          setIsLoadingApplications(false)
        })
        .catch(() => {
          setIsLoadingApplications(false)
        })
    }
  }, [account])

  return (
    <Dashboard title={`user-manager | ${account?.username} `}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Title>Profile Info</Title>
          <Grid item xs={12} md={12} lg={12} className={classes.accountProfile}>
            {account && <AccountInfo account={account} />}
          </Grid>
          <AccountsSessions />
          <ApplicationTable
            title="Applications"
            type={'applications'}
            isLoading={isLoadingApplications}
            data={applications}
          />
        </>
      )}
    </Dashboard>
  )
}
