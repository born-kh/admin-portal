//react hoooks
import { useEffect, useState } from 'react'
//next router
import { useRouter } from 'next/router'
//material ui components
import { Grid } from '@material-ui/core'
//custom components
import Dashboard from '@components/Dashboard'
import AccountsSessions from '@components/AccountsSessions'
import AccountInfo from '@components/AccountInfo'
import Title from '@components/common/Title'
import ApplicationTable from '@components/DocumentManager/ApplicationTable'
import Loader from '@components/common/Loader'
//user-manager REST APIS
import { userAPI, documentAPI } from 'service/api'
//user-manager interfaces
import { SearchType, Account } from '@interfaces/user-manager'
import { Application } from '@interfaces/document-manager'
//styles
import { useStyles } from './styles'

/* User Manager Detail Info Component */
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
