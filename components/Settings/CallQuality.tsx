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
import { AuthSettings, PermissionType, CallQuality } from '@interfaces/settings'
//constants
import { initialAlertData } from '@utils/constants'
import { Dictionary } from 'lodash'

/* AUTH Component */
export default function () {
  const [allCallQuality, setAllCallQuality] = useState<CallQuality[]>([])
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      ask: true,
      AskDuration: 0,
      AskIf: {},
      questions: {},
    } as CallQuality,

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
      .deleteCallQulaity({ id })
      .then(() => {
        setAllCallQuality(allCallQuality.filter((item) => item.id !== id))

        setAlertData({ message: `Call quality deleted`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `Call quality ${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const openEditModal = (data: CallQuality) => {
    formik.setValues(data)
    setIsOpen(true)
  }
  const handleCraete = () => {
    if (formik.values.id) {
      settingsAPI
        .updateCallQulaity(formik.values)
        .then(() => {
          setAllCallQuality(allCallQuality.map((item) => (item.id === formik.values.id ? formik.values : item)))
          handleClose()
          setAlertData({ message: `Call qulaity updated.`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `Update Call quality ${error.message}`, type: AlertMessageType.error, open: true })
        })
    } else {
      settingsAPI
        .createCallQulaity(formik.values)
        .then((response) => {
          handleClose()
          setAllCallQuality([...allCallQuality, response.data.callQuality])
          setAlertData({ message: `Call quality created`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `Create call qulaity ${error.message}`, type: AlertMessageType.error, open: true })
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    settingsAPI
      .getAllCallQulaity()
      .then((response) => {
        if (response.status === 200) {
          setAllCallQuality(response.data.allCallQuality)
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
        title="Call Quality"
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: 'There are no call qulaity' } }}
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Ask', field: 'ask' },
          { title: 'Ask Duration', field: 'askDuration' },
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
              formik.setValues({ ask: true, AskDuration: 0, AskIf: {}, questions: {} })
              setIsOpen(true)
            },
          },
        ]}
        data={allCallQuality}
        options={{
          sorting: false,
          search: false,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="xs">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Call quality
        </CustomDialogTitle>
        {/* <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
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
        </CustomDialogContent> */}
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={() => {}} color="primary">
            OK
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Fragment>
  )
}
