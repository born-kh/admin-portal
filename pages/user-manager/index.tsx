import React, { useState } from 'react'
///material ui components
import { TextField, Paper, Dialog, Button, Avatar } from '@material-ui/core'
//useformik hook
import { useFormik } from 'formik'
//custom components
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'
import Loader from '@components/common/Loader'
import Dashboard from '@components/Dashboard'
import Title from '@components/common/Title'
//material table component
import MaterialTable from 'material-table'
//material ui icons
import DetailsIcon from '@material-ui/icons/Details'
import LockIcon from '@material-ui/icons/Lock'
//next router
import { useRouter } from 'next/router'
//user-manager interfaces
import { SearchType, SearchTypeParams, Account } from '@interfaces/user-manager'
//user-manager REST APIS
import { userAPI } from 'service/api'
//styles
import { useStyles } from './styles'

/* User Manager Component */
export default function () {
  const classes = useStyles()
  const router = useRouter()

  const [users, setUsers] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')

  const formik = useFormik({
    initialValues: {
      searchList: [
        { type: SearchType.username, search: '' },
        { type: SearchType.phone, search: '' },
        { type: SearchType.email, search: '' },
        { type: SearchType.lastname, search: '' },
        { type: SearchType.firstname, search: '' },
        { type: SearchType.accountID, search: '' },
      ] as SearchTypeParams[],
    },

    onSubmit: (values) => {
      const filterSearchList = values.searchList.filter((item) => item.search)
      setUsers([])
      setIsLoading(true)
      userAPI
        .searchUser(filterSearchList)
        .then((accounts) => {
          setUsers(accounts)

          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setIsLoading(false)
        })
    },
  })

  const handleClose = () => {
    setIsOpen(false)
  }

  if (router.isFallback) {
    return <Loader />
  }
  return (
    <Dashboard title={'user-manager'}>
      <Paper className={classes.paper}>
        <Title>Advanced search</Title>
        <form noValidate onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="searchList[0].search"
            label="UserName"
            name="searchList[0].search"
            className={classes.textField}
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.searchList[0].search}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="searchList[1].search"
            className={classes.textField}
            name="searchList[1].search"
            label="Phone Number"
            onChange={formik.handleChange}
            value={formik.values.searchList[1].search}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="searchList[2].search"
            className={classes.textField}
            name="searchList[2].search"
            label="Email"
            onChange={formik.handleChange}
            value={formik.values.searchList[2].search}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="searchList[3].search"
            className={classes.textField}
            name="searchList[3].search"
            label="Last Name"
            onChange={formik.handleChange}
            value={formik.values.searchList[3].search}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="searchList[4].search"
            className={classes.textField}
            name="searchList[4].search"
            label="First Name"
            onChange={formik.handleChange}
            value={formik.values.searchList[4].search}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="searchList[5].search"
            className={classes.textField}
            name="searchList[5].search"
            label="Account ID"
            onChange={formik.handleChange}
            value={formik.values.searchList[5].search}
          />

          <Button variant="contained" className={classes.button} color="primary" type="submit">
            Search
          </Button>
        </form>
      </Paper>

      <div style={{ marginTop: 30 }}>
        <MaterialTable
          title="Users"
          isLoading={isLoading}
          localization={{ body: { emptyDataSourceMessage: 'There are no users' } }}
          columns={[
            {
              field: 'avatar',
              title: 'Avatar',
              align: 'center',
              render: (rowData) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar>H</Avatar>
                </div>
              ),
            },

            { title: 'User Name', field: 'username', align: 'center' },
            { title: 'First Name', field: 'firstName', align: 'center' },
            { title: 'Last Name', field: 'lastName', align: 'center' },
            { title: 'Status', field: 'status', align: 'center' },

            {
              title: 'Detail Info',
              field: 'accountID',

              render: (rowData) =>
                rowData && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/user-manager/' + rowData.accountID)}
                    className={classes.buttonTable}
                    startIcon={<DetailsIcon />}
                  >
                    Info
                  </Button>
                ),
            },
            {
              title: 'Change Password',
              field: 'accountID',

              render: (rowData) =>
                rowData && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsOpen(true)}
                    className={classes.buttonTable}
                    startIcon={<LockIcon />}
                  >
                    Change
                  </Button>
                ),
            },
          ]}
          data={users}
          options={{
            sorting: false,
            search: false,
          }}
        />

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
          <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Change Password
          </CustomDialogTitle>
          <CustomDialogContent dividers>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="searchList[5].search"
              className={classes.textField}
              name="searchList[5].search"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </CustomDialogContent>
          <CustomDialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Generate
            </Button>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </CustomDialogActions>
        </Dialog>
      </div>
    </Dashboard>
  )
}
