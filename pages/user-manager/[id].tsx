//react hoooks
import { useEffect, useState } from 'react'
//next router
import { useRouter } from 'next/router'
//material ui components
import { Grid, Paper, Tabs, Tab, Badge } from '@material-ui/core'
//custom components
import Dashboard from '@components/Dashboard'
import AccountsSessions from '@components/AccountsSessions'
import AccountInfo from '@components/AccountInfo'
import Title from '@components/common/Title'
import ApplicationTable from '@components/DocumentManager/ApplicationTable'
import Loader from '@components/common/Loader'
//user-manager REST APIS
import { userAPI, documentAPI, sessionAPI } from 'service/api'
//user-manager interfaces
import { SearchType, Account } from '@interfaces/user-manager'
import { Application } from '@interfaces/document-manager'
//styles
import { useStylesUserManager } from 'styles/user-manager-styles'
import TabPanel from '@components/common/TabPanel'
import useTranslation from 'hooks/useTranslation'

/* User Manager Detail Info Component */
export default function UserManagerDetail() {
  const classes = useStylesUserManager()
  const [account, setAcccount] = useState<Account | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoadingApplications, setIsLoadingApplications] = useState(false)
  const [value, setValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { t } = useTranslation()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
    console.log(newValue)
    if (newValue === 2) {
      router.push({
        pathname: '/user-manager/[id]',
        query: { id: router.query.id, applications: 'user-manager' },
      })
    } else {
      router.push({
        pathname: '/user-manager/[id]',
        query: { id: router.query.id },
      })
    }
  }
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

    if (router.query.applications) {
      setValue(2)
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <Paper style={{ paddingTop: 10 }}>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab
              label={
                <Badge badgeContent={0} color="secondary">
                  {t('profileInfo')}
                </Badge>
              }
            />
            <Tab
              label={
                <Badge badgeContent={0} color="secondary">
                  {t('sessions')}
                </Badge>
              }
            />
            <Tab
              label={
                <Badge badgeContent={0} color="secondary">
                  {t('applications')}
                </Badge>
              }
            />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid item xs={12} md={12} lg={12} className={classes.accountProfile}>
              {account && <AccountInfo account={account} />}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AccountsSessions />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ApplicationTable
              title=""
              type={'applications'}
              isLoading={isLoadingApplications}
              applications={applications}
            />
          </TabPanel>
        </Paper>
      )}
    </>
  )
}
