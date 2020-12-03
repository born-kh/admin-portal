import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import { TextField, Dialog, MenuItem, InputLabel, FormControl, Button, Select } from '@material-ui/core'
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

/* AUTH Component */
export default function () {
  const [allAuthSeetings, setAllAuthSettings] = useState<AuthSettings[]>([])
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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

        setAlertData({ message: `Auth settings deleted`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        handleClose()
        setAlertData({ message: `Auth settings ${error.message}`, type: AlertMessageType.error, open: true })
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
          setAlertData({ message: `Auth settings updated.`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `Update Auth Settings ${error.message}`, type: AlertMessageType.error, open: true })
        })
    } else {
      settingsAPI
        .createAuthSettings(formik.values)
        .then((response) => {
          setAllAuthSettings([...allAuthSeetings, { ...formik.values }])
          setAlertData({ message: `Auth settings created`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `Create Auth Settings ${error.message}`, type: AlertMessageType.error, open: true })
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
        title="Auth Settings"
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: 'There are no auth settings' } }}
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Prefix', field: 'prefix' },
          { title: 'Permission', field: 'permissionType' },
          { title: 'Description', field: 'description' },
          {
            title: 'Edit',
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => openEditModal(rowData)}
                >
                  Edit
                </Button>
              ),
          },

          {
            title: 'Delete',
            field: '',
            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => rowData.id && handleDelete(rowData.id)}
                >
                  Delete
                </Button>
              ),
          },
        ]}
        actions={[
          {
            icon: 'add_box',
            tooltip: 'Create auth settings',
            position: 'toolbar',
            onClick: () => {
              formik.setValues({ prefix: '', permissionType: PermissionType.allow, description: '' })
              setIsOpen(true)
            },
          },
        ]}
        data={allAuthSeetings}
        options={{
          sorting: false,
          search: false,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="xs">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Auth Settings
        </CustomDialogTitle>
        <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="prefix"
            name="prefix"
            label="Prefix"
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
              label="Permission"
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
            label="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleCraete} color="primary">
            OK
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Fragment>
  )
}
