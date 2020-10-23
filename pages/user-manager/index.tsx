import React, { useState } from 'react'
import Dashboard from '@components/Dashboard'
import Title from '@components/common/Title'
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
import Button from '@material-ui/core/Button'
import { Grid, TextField, IconButton, Paper } from '@material-ui/core'
import { useFormik } from 'formik'
import { useStyles } from './styles'

import { SearchTypeParams } from 'interfaces/auth'
import * as usermanagerAPI from 'service/userManagerAPI'
import MaterialTable from 'material-table'
import { resetServerContext } from 'react-beautiful-dnd'
import Avatar from '@material-ui/core/Avatar'
import DetailsIcon from '@material-ui/icons/Details'
import LockIcon from '@material-ui/icons/Lock'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useRouter } from 'next/router'
import { SearchType } from '@interfaces/user-manager'

export default function () {
  const classes = useStyles()
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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

      usermanagerAPI
        .searchUsers(filterSearchList)
        .then((users) => {
          setUsers(users)
          setIsLoading(false)
        })
        .catch(() => {
          setIsLoading(false)
        })
    },
  })
  resetServerContext()
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
              render: (rowData) => <Avatar>H</Avatar>,
            },

            { title: 'User Name', field: 'username' },
            { title: 'First Name', field: 'firstName' },
            { title: 'Last Name', field: 'lastName' },
            { title: 'Status', field: 'status' },
            {
              title: 'Info User',
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
                    onClick={() => {}}
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
            search: false,
          }}
        />
      </div>

      {/* <SnackBarAlert onClose={handleClose} message={"success message"} type={AlertMessageType.sucess} open={open} /> */}
    </Dashboard>
  )
}
