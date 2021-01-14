import React, { useState } from 'react'
///material ui components
import { TextField, Paper, Dialog, Button, Avatar, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core'
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
import moment from 'moment'
//next router
import { useRouter } from 'next/router'
//user-manager interfaces
import { SearchType, SearchTypeParams, Account, AccountGetByDateParams, FilterType } from '@interfaces/user-manager'
//user-manager REST APIS
import { userAPI } from 'service/api'
//styles
import { useStylesUserManager } from 'styles/user-manager-styles'
import useTranslation from 'hooks/useTranslation'

/* User Manager Component */
export default function UserManager() {
  const classes = useStylesUserManager()
  const router = useRouter()

  const [users, setUsers] = useState<Account[]>([])
  const [filterParams, setFilterParams] = useState<AccountGetByDateParams>({
    ts: '2020-11-12',
    type: FilterType.around,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState('')

  const { t } = useTranslation()

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
  const handleOnChangeFilterParams = (event: React.ChangeEvent<any>) => {
    setFilterParams({ ...filterParams, [event.target.name]: event.target.value })
  }

  const handleFilterAccounts = () => {
    setUsers([])
    setIsLoading(true)
    userAPI
      .accountGetByDate({ ...filterParams, ts: new Date(filterParams.ts).toISOString().split('.')[0] + 'Z' })
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data.accounts)
        }

        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  if (router.isFallback) {
    return <Loader />
  }

  console.log(users)
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Title>{t('advancedSearch')}</Title>
          <form noValidate onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="searchList[0].search"
              label={t('username')}
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
              label={t('phoneNumber')}
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
              label={t('email')}
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
              label={t('lastName')}
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
              label={t('firstName')}
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
              label={t('accountId')}
              onChange={formik.handleChange}
              value={formik.values.searchList[5].search}
            />

            <Button variant="contained" className={classes.button} color="primary" type="submit" disabled={isLoading}>
              {t('search')}
            </Button>
          </form>
        </Paper>
        <Paper className={classes.paper2}>
          <Title>{t('filterAccountByDate')}</Title>
          <form noValidate onSubmit={formik.handleSubmit}>
            <TextField
              label={t('dateTime')}
              type="date"
              name="ts"
              id="dateTime"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={filterParams.ts}
              onChange={handleOnChangeFilterParams}
            />

            <FormControl variant="outlined" className={classes.textField} style={{ margin: '50px 5px' }}>
              <InputLabel id="filterType">{t('type')}</InputLabel>

              <Select
                labelId="filterType"
                id="filterType"
                name="type"
                value={filterParams.type}
                onChange={handleOnChangeFilterParams}
                label={t('type')}
              >
                <MenuItem key={FilterType.after} value={FilterType.after}>
                  {FilterType.after}
                </MenuItem>
                <MenuItem key={FilterType.before} value={FilterType.before}>
                  {FilterType.before}
                </MenuItem>
                <MenuItem key={FilterType.exact} value={FilterType.exact}>
                  {FilterType.exact}
                </MenuItem>
                <MenuItem key={FilterType.around} value={FilterType.around}>
                  {FilterType.around}
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              className={classes.button2}
              color="primary"
              type="button"
              onClick={handleFilterAccounts}
              disabled={isLoading}
            >
              {t('search')}
            </Button>
          </form>
        </Paper>
      </div>
      <div style={{ marginTop: 10 }}>
        <MaterialTable
          title={t('users')}
          isLoading={isLoading}
          localization={{
            body: { emptyDataSourceMessage: t('noUsers') },
            toolbar: { searchPlaceholder: t('search') },
            pagination: {
              firstTooltip: t('firstTooltip'),
              lastTooltip: t('lastTooltip'),
              previousTooltip: t('previousTooltip'),
              nextTooltip: t('nextTooltip'),
              labelRowsSelect: t('labelRowsSelect'),
            },
          }}
          columns={[
            {
              field: 'avatar',
              title: t('avatar'),
              align: 'center',
              render: (rowData) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Avatar>H</Avatar>
                </div>
              ),
            },

            {
              title: t('fullName'),
              field: 'firstName',
              align: 'center',
              render: (rowData) => rowData && rowData.firstName + ' ' + rowData.lastName,
            },
            { title: t('username'), field: 'username', align: 'center' },
            {
              title: t('phoneNumber'),
              field: 'phoneNumber',
              align: 'center',
              render: (rowData) => rowData.phones && rowData.phones.length > 0 && rowData.phones[0].number,
            },
            { title: t('status'), field: 'status', align: 'center' },

            {
              title: t('detailInfo'),
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
                    {t('detail')}
                  </Button>
                ),
            },
            {
              title: t('createdAt'),
              field: 'createdAt',
              render: (rowData) => rowData.createdAt && moment(rowData.createdAt).format('DD MMM YYYY HH:mm'),
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
            {t('changePasssword')}
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
              {t('generatePasssword')}
            </Button>
            <Button autoFocus onClick={handleClose} color="primary">
              {t('ok')}
            </Button>
          </CustomDialogActions>
        </Dialog>
      </div>
    </>
  )
}
