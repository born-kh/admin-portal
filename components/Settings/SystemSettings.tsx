import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import { Dialog, Button, Paper } from '@material-ui/core'
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
import dynamic from 'next/dynamic'
import useTranslation from 'hooks/useTranslation'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

/* SYSTEM SETTINGS */
export default function SystemSettingsComponent() {
  const [systemSettings, setSystemSettings] = useState<SystemSettings[]>([])
  const [systemSettingsData, setSystemSettingsData] = useState<SystemSettings | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const { t } = useTranslation()

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const openEditModal = (data: SystemSettings) => {
    let settingsData = { ...data }
    delete settingsData.tableData
    setSystemSettingsData(settingsData)
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
          setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: ` ${error.message}`, type: AlertMessageType.error, open: true })
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
  const onEdit = (e: any) => {
    console.log(e)
    setSystemSettingsData(e.updated_src)
  }
  const handleAdd = (e: any) => {
    console.log(e)
  }

  // onDelete = e => {
  //   setSystemSettingsData{ src: e.updated_src });
  // };

  return (
    <Fragment>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <MaterialTable
        title={t('systemSettings')}
        isLoading={isLoading}
        // localization={{ body: { emptyDataSourceMessage: 'There are no system settings' } }}
        columns={[
          { title: 'ID', field: 'id' },
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
        ]}
        data={systemSettings}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          sorting: false,
          search: false,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="md">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('systemSettings')}
        </CustomDialogTitle>
        <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <ReactJson src={systemSettingsData || {}} onEdit={onEdit} />
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button autoFocus onClick={handleEdit} color="primary">
            {t('ok')}
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Fragment>
  )
}
