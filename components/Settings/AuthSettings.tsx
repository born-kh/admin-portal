import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import { TextField, Dialog, MenuItem, InputLabel, FormControl, Button, Select, Paper } from '@material-ui/core'
//material table lib
import MaterialTable from 'material-table'
//useformik hook
import { useFormik } from 'formik'
//custom components
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'
import Dashboard from '@components/Dashboard'
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
//settings REST APIS
import { settingsAPI } from 'service/api'
//material ui icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
//settings interfaces
import { AuthSettings, PermissionType } from '@interfaces/settings'
//constants
import { initialAlertData } from '@utils/constants'
import useTranslation from 'hooks/useTranslation'

/* AUTH Component */
export default function AuthSettingsComponent() {
  const [allAuthSeetings, setAllAuthSettings] = useState<AuthSettings[]>([])
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      prefix: '',
      permissionType: PermissionType.allow,
      description: '',
    } as AuthSettings,

    onSubmit: (values) => {},
  })
  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleDelete = (id: string) => {
    settingsAPI
      .deleteAuthSettings({ id })
      .then(() => {
        handleClose()
        setAllAuthSettings(allAuthSeetings.filter((item: AuthSettings) => item.id !== id))

        setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        handleClose()
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const openEditModal = (data: AuthSettings) => {
    formik.setValues(data)
    setIsOpen(true)
  }
  const handleCraete = () => {
    if (formik.values.id) {
      settingsAPI
        .updateAuthSettings(formik.values)
        .then(() => {
          setAllAuthSettings(
            allAuthSeetings.map((item: AuthSettings) => (item.id === formik.values.id ? formik.values : item))
          )
          handleClose()
          setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: ` ${error.message}`, type: AlertMessageType.error, open: true })
        })
    } else {
      settingsAPI
        .createAuthSettings(formik.values)
        .then((response) => {
          setAllAuthSettings([...allAuthSeetings, { ...formik.values }])
          setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    settingsAPI
      .getAllAuthSettings()
      .then((response) => {
        if (response.status === 200) {
          setAllAuthSettings(response.data.allSettings)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Fragment>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <MaterialTable
        title={t('authSettins')}
        isLoading={isLoading}
        // localization={{ body: { emptyDataSourceMessage: 'There are no auth settings' } }}
        columns={[
          { title: 'ID', field: 'id' },
          { title: t('prefix'), field: 'prefix' },
          { title: t('permissionType'), field: 'permissionType' },
          { title: t('description'), field: 'description' },
          {
            title: t('edit'),
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => openEditModal(rowData)}
                >
                  {t('edit')}
                </Button>
              ),
          },

          {
            title: t('remove'),
            field: '',
            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => rowData.id && handleDelete(rowData.id)}
                >
                  {t('remove')}
                </Button>
              ),
          },
        ]}
        actions={[
          {
            icon: 'add_box',
            tooltip: t('create'),
            position: 'toolbar',
            onClick: () => {
              formik.setValues({ prefix: '', permissionType: PermissionType.allow, description: '' })
              setIsOpen(true)
            },
          },
        ]}
        data={allAuthSeetings}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          sorting: false,
          search: false,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="xs">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('authSettings')}
        </CustomDialogTitle>
        <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="prefix"
            name="prefix"
            label={t('prefix')}
            onChange={formik.handleChange}
            value={formik.values.prefix}
          />

          <FormControl variant="outlined" style={{ margin: '20px 5px' }}>
            <InputLabel id="permissionType">Permission</InputLabel>
            <Select
              labelId="permissionType"
              id="permissionType"
              fullWidth
              name="permissionType"
              style={{ width: 300 }}
              value={formik.values.permissionType}
              onChange={formik.handleChange}
              label={t('permission')}
            >
              <MenuItem key={PermissionType.allow} value={PermissionType.allow}>
                Allow
              </MenuItem>
              <MenuItem key={PermissionType.deny} value={PermissionType.deny}>
                Deny
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="description"
            name="description"
            label={t('description')}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button autoFocus onClick={handleCraete} color="primary">
            {t('ok')}
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Fragment>
  )
}
