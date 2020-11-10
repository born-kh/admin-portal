import React, { useState, useEffect } from 'react'
//material ui components
import { Dialog, Button } from '@material-ui/core'
//matetrail table lib
import MaterialTable from 'material-table'
//settings REST APIS
import { settingsAPI } from 'service/api'
import EditIcon from '@material-ui/icons/Edit'
//settings interfaces
import { SystemSettings, WebRTCSettings } from '@interfaces/settings'
//custom components
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
import Dashboard from '@components/Dashboard'
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'
//constants
import { initialAlertData } from '@utils/constants'
//json-editor lib
import { JSONEditor } from 'react-json-editor-viewer'

/* SYSTEM SETTINGS */
export default function () {
  const [systemSettings, setSystemSettings] = useState<SystemSettings[]>([])
  const [systemSettingsData, setSystemSettingsData] = useState<SystemSettings>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const openEditModal = (data: SystemSettings) => {
    setSystemSettingsData(data)
    setIsOpen(true)
  }
  const handleEdit = () => {
    if (systemSettingsData) {
      settingsAPI
        .setSystemSettings(systemSettingsData)
        .then(() => {
          setSystemSettings((prevSystemSettings) =>
            prevSystemSettings.map((item) => (item.id === systemSettingsData.id ? systemSettingsData : item))
          )
          handleClose()
          setAlertData({ message: `System settings updated`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `Update Auth Settings ${error.message}`, type: AlertMessageType.error, open: true })
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    settingsAPI
      .getSystemSettings()
      .then((response) => {
        if (response.status === 200) {
          setSystemSettings(response.data.settings)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])
  const onChangeSettingsData = (key: string, value: string, parent: SystemSettings, data: SystemSettings) => {
    console.log(key, value, parent, data)
    // setSystemSettingsData((prevSystemSettingsData: SystemSettings) => ({ ...prevSystemSettingsData, network: data }))
  }

  const onChangeVoip = (key: string, value: string, parent: WebRTCSettings, data: WebRTCSettings) => {
    // setSystemSettingsData((prevSystemSettingsData: SystemSettings) => ({ ...prevSystemSettingsData, voip: data }))
  }

  return (
    <Dashboard title={'system-settings'}>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <MaterialTable
        title="System Settings"
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: 'There are no system settings' } }}
        columns={[
          { title: 'ID', field: 'id' },
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
        ]}
        data={systemSettings}
        options={{
          sorting: false,
          search: false,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="md">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit system settings
        </CustomDialogTitle>
        <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <JSONEditor data={systemSettingsData} collapsible onChange={onChangeSettingsData} />
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleEdit} color="primary">
            OK
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Dashboard>
  )
}
