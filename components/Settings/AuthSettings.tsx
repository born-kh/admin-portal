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

//material ui icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

//constants
import { initialAlertData } from '@utils/constants'
import useTranslation from 'hooks/useTranslation'
import { IAuthSettings, PermissionTypeAuthSettings } from '@Interfaces'
import { ServiceSettingsManager } from '@Services'

/* AUTH Component */
export default function AuthSettingsComponent() {
  const [allAuthSeetings, setAllAuthSettings] = useState<IAuthSettings[]>([])
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      prefix: '',
      permissionType: PermissionTypeAuthSettings.allow,
      description: '',
    } as IAuthSettings,

    onSubmit: (values) => {},
  })
  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleDelete = (id: string) => {
    ServiceSettingsManager.authSettingsDelete({ id })
      .then((res) => {
        if (res.result) {
          setAllAuthSettings(allAuthSeetings.filter((item: IAuthSettings) => item.id !== id))
          setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
        } else {
          setAlertData({ message: res.error.reason, type: AlertMessageType.error, open: true })
        }
        handleClose()
      })
      .catch((error) => {
        handleClose()
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const openEditModal = (data: IAuthSettings) => {
    formik.setValues(data)
    setIsOpen(true)
  }
  const handleCraete = () => {
    if (formik.values.id) {
      ServiceSettingsManager.authSettingsUpdate(formik.values)
        .then((res) => {
          if (res.result) {
            setAllAuthSettings(
              allAuthSeetings.map((item: IAuthSettings) => (item.id === formik.values.id ? formik.values : item))
            )
            setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
          } else {
            setAlertData({ message: res.error.reason, type: AlertMessageType.error, open: true })
          }

          handleClose()
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: ` ${error.message}`, type: AlertMessageType.error, open: true })
        })
    } else {
      ServiceSettingsManager.authSettingsCreate(formik.values)
        .then((res) => {
          if (res.result) {
            setAllAuthSettings([...allAuthSeetings, { ...formik.values }])
            setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
          } else {
            setAlertData({ message: res.error.reason, type: AlertMessageType.error, open: true })
          }
          handleClose()
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    ServiceSettingsManager.authSettingsGetAll({})
      .then((res) => {
        if (res.result) {
          setAllAuthSettings(res.result.allSettings)
        } else {
          setAlertData({ message: res.error.reason, type: AlertMessageType.error, open: true })
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
              formik.setValues({ prefix: '', permissionType: PermissionTypeAuthSettings.allow, description: '' })
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
          rowStyle: { fontFamily: 'Roboto', color: 'rgba(0, 0, 0, 0.87)', fontSize: '0.875rem', fontWeight: 400 },
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
              <MenuItem key={PermissionTypeAuthSettings.allow} value={PermissionTypeAuthSettings.allow}>
                Allow
              </MenuItem>
              <MenuItem key={PermissionTypeAuthSettings.deny} value={PermissionTypeAuthSettings.deny}>
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
