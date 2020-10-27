import { useRouter } from 'next/router'
import Dashboard from '@components/Dashboard'
import * as usermanagerAPI from 'service/userManagerAPI'
import { useEffect, useState } from 'react'
import Title from '@components/common/Title'
import { Grid } from '@material-ui/core'
import { SearchType, Account } from '@interfaces/user-manager'
import { useStyles } from './styles'
import AccountsSessions from '@components/AccountsSessions'
import AccountInfo from '@components/AccountInfo'
function AccountPage(props: any) {
  const classes = useStyles()
  const [account, setAcccount] = useState<Account | null>(null)

  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    function loadData() {
      usermanagerAPI
        .searchUsers([{ type: SearchType.accountID, search: router.query.id as string }])
        .then((accounts) => {
          if (accounts && accounts.length > 0) {
            setAcccount(accounts[0])
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })

      // const applications = await fetchApplicationsByAccount(router.query.id as string)
    }
    if (router.query.id) {
      loadData()
    }
  }, [router])
  if (loading) {
    return <Dashboard></Dashboard>
  }

  return (
    <Dashboard title={`user-manager | ${account?.username} `}>
      <Title>Profile Info</Title>
      <Grid item xs={12} md={12} lg={12} className={classes.accountProfile}>
        {account && <AccountInfo account={account} />}
      </Grid>
      <AccountsSessions />
    </Dashboard>
  )
}

export default AccountPage
