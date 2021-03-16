import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import { Dialog, Button, Paper } from '@material-ui/core'
//matetrail table lib
import MaterialTable from 'material-table'
//settings REST APIS

import EditIcon from '@material-ui/icons/Edit'

//custom components
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
import Dashboard from '@components/Dashboard'
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'
//constants
import { initialAlertData } from '@utils/constants'

//json-editor lib
import dynamic from 'next/dynamic'
import useTranslation from 'hooks/useTranslation'
import { ISystemSettings, IWebRTCSettings } from '@Interfaces'
import { ServiceSettingsManager } from '@Services'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

/* SYSTEM SETTINGS */
export default function SystemSettingsComponent() {
  const [systemSettings, setSystemSettings] = useState<ISystemSettings[]>([])
  const [systemSettingsData, setSystemSettingsData] = useState<ISystemSettings | null>(null)
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

  const openEditModal = (data: ISystemSettings) => {
    let settingsData = { ...data }
    delete settingsData.tableData
    setSystemSettingsData(settingsData)
    setIsOpen(true)
  }
  const handleEdit = () => {
    if (systemSettingsData) {
      ServiceSettingsManager.systemSetSettings(systemSettingsData)
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

    ServiceSettingsManager.systemGetSettings({})
      .then((res) => {
        if (res.result) {
          setSystemSettings(res.result.settings)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])
  const onChangeSettingsData = (key: string, value: string, parent: ISystemSettings, data: ISystemSettings) => {
    console.log(key, value, parent, data)
    // setSystemSettingsData((prevSystemSettingsData: SystemSettings) => ({ ...prevSystemSettingsData, network: data }))
  }

  const onChangeVoip = (key: string, value: string, parent: IWebRTCSettings, data: IWebRTCSettings) => {
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
          rowStyle: {
            fontFamily: 'Roboto',
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '0.875rem',
            fontWeight: 400,
          },
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
