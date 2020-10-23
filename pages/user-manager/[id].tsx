import { useRouter } from 'next/router'
import Dashboard from '@components/Dashboard'
import * as usermanagerAPI from 'service/userManagerAPI'
import { useEffect, useState } from 'react'
import { fetchApplicationsByAccount } from 'service/documentManagerAPI'
import Title from '@components/common/Title'
import { Grid, Paper, Button, Switch } from '@material-ui/core'
import { SearchType, Account } from '@interfaces/user-manager'
import DetailsAccount from '@components/DetailsAccount'
import { useStyles } from './styles'
import MaterialTable from 'material-table'
import DetailsIcon from '@material-ui/icons/Details'
import LockIcon from '@material-ui/icons/Lock'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import AccountsSessions from '@components/AccountsSessions'
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
          if (accounts.length > 0) {
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
  console.log(account)

  return (
    <Dashboard title={`user-manager | ${account?.username} `}>
      {/* <Grid item xs={12} md={12} lg={12}>
        <Paper className={classes.paper}>
          <DetailsAccount account={account} />
        </Paper>
      </Grid> */}
      <AccountsSessions />
    </Dashboard>
  )
}

export default AccountPage
