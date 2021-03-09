import React, { useState, useEffect } from 'react'
import Dashboard from '@components/Dashboard'
//material ui comments
import {
  TextField,
  Dialog,
  Switch,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  Button,
} from '@material-ui/core'
// formik lib
import { useFormik } from 'formik'
// material table lib
import MaterialTable from 'material-table'
// custom modal components
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'

import useTranslation from 'hooks/useTranslation'
import moment from 'moment'
import { IApiKey, Platforms, IApiKeyCreateParams, IApiKeyUpdateParams } from '@Interfaces'
import { ServiceApiKeyManager } from '@Services'
///api-key-manager component
export default function ApiKeyManager() {
  const [apiKeys, setApiKeys] = useState<IApiKey[]>([])
  const [filterApiKeys, setFilterApiKeys] = useState<IApiKey[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<Platforms>(Platforms.ALL)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      validFrom: '',
      validTo: '',
      enabled: true,
      version: '',
      platform: Platforms.android,
    } as IApiKeyCreateParams,

    onSubmit: (values) => {},
  })

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleUpdateApiKey = (id: number) => {
    const apiKey = apiKeys.find((item) => item.id === id)
    if (apiKey) {
      const params: IApiKeyUpdateParams = {
        id: apiKey.id,
        key: apiKey.apiKey,
        scopes: apiKey.scopes,
        validFrom: apiKey.validFrom,
        validTo: apiKey.validTo,
        enabled: !apiKey.enabled,
        cacheExpiration: apiKey.cacheExpiration,
      }
      ServiceApiKeyManager.apiKeyUpdate(params)
        .then(() => {
          setApiKeys((prevApiKeys) => {
            return prevApiKeys.map((item) => {
              if (item.id === id) {
                return { ...item, ...apiKey }
              }
              return item
            })
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
  useEffect(() => {
    if (selectedPlatform !== Platforms.ALL) {
      setFilterApiKeys(apiKeys.filter((apiKey) => apiKey.platform === selectedPlatform))
    } else {
      setFilterApiKeys(apiKeys)
    }
  }, [selectedPlatform, apiKeys])

  const handleCreateApiKey = () => {
    console.log(formik.values)
    ServiceApiKeyManager.apiKeyCreate({
      ...formik.values,
      validTo: new Date(formik.values.validTo).toISOString().split('.')[0] + 'Z',
      validFrom: new Date(formik.values.validFrom).toISOString().split('.')[0] + 'Z',
    })

      .then((res) => {
        if (res.result) {
          setApiKeys((prevApiKeys) => {
            return [...prevApiKeys, res.result.apiKey]
          })
        }

        setIsOpen(false)
      })
      .catch((e) => {
        setIsOpen(false)
        console.log(e)
      })
  }
  useEffect(() => {
    setIsLoading(true)
    ServiceApiKeyManager.apiKeyGet({})
      .then((res) => {
        if (res.result) {
          setApiKeys(res.result.apiKeys.sort((x, y) => +new Date(y.createdAt) - +new Date(x.createdAt)))
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])
  const platforms = []
  for (const value in Platforms) {
    platforms.push(
      <MenuItem key={value} value={value}>
        {value}
      </MenuItem>
    )
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <FormControlLabel
          control={
            <FormControl variant="outlined" size="small">
              <Select
                style={{ width: 220, margin: '0px 0px 0px 40px' }}
                value={selectedPlatform}
                name="callType"
                onChange={(e) => setSelectedPlatform(e.target.value as Platforms)}
              >
                {Object.values(Platforms).map((value: string) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          label="Plaform:"
          labelPlacement="start"
          style={{ marginBottom: 5 }}
        />
      </div>
      <MaterialTable
        title={t('apiKeys')}
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: t('noApiKeys') } }}
        columns={[
          { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 75 },
          { title: t('ApiKey'), field: 'apiKey' },
          { title: t('platform'), field: 'platform' },
          { title: t('version'), field: 'version' },
          {
            title: t('validFrom'),
            field: 'validFrom',
            render: (rowData) => rowData.validFrom && moment(rowData.validFrom).format('DD MMM YYYY HH:mm'),
          },

          {
            title: t('validTo'),
            field: 'validTo',
            render: (rowData) => rowData.validTo && moment(rowData.validTo).format('DD MMM YYYY HH:mm'),
          },

          {
            title: t('expiration'),
            field: 'cacheExpiration',
          },
          {
            title: t('createdAt'),
            field: 'createdAt',
            render: (rowData) => rowData.createdAt && moment(rowData.createdAt).format('DD MMM YYYY HH:mm'),
          },
          {
            title: t('enabled'),
            field: '',

            render: (rowData) =>
              rowData && (
                <Switch
                  checked={rowData.enabled}
                  onChange={() => {
                    handleUpdateApiKey(rowData.id)
                  }}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              ),
          },
        ]}
        actions={[
          {
            icon: 'add_box',
            tooltip: t('createApiKey'),
            position: 'toolbar',
            onClick: () => {
              setIsOpen(true)
            },
          },
        ]}
        data={filterApiKeys}
        options={{
          sorting: false,
          search: false,
          pageSize: 10,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="xs">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('createApiKey')}
        </CustomDialogTitle>
        <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="version"
            name="version"
            label={t('version')}
            onChange={formik.handleChange}
            value={formik.values.version}
          />

          <FormControl variant="outlined" style={{ margin: '20px 5px' }}>
            <InputLabel id="platform">{t('platform')}</InputLabel>

            <Select
              id="platform"
              fullWidth
              name="platform"
              style={{ width: 300 }}
              value={formik.values.platform}
              onChange={formik.handleChange}
              label={t('platform')}
            >
              {platforms}
            </Select>
          </FormControl>
          <TextField
            label={t('validFrom')}
            type="date"
            fullWidth
            variant="outlined"
            name="validFrom"
            id="validFrom"
            style={{ width: 300, marginBottom: 20 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.validFrom}
            onChange={formik.handleChange}
          />
          <TextField
            label={t('validTo')}
            type="date"
            fullWidth
            name="validTo"
            style={{ width: 300 }}
            variant="outlined"
            id="validTo"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.validTo}
            onChange={formik.handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox checked={formik.values.enabled} onChange={formik.handleChange} name="enabled" color="primary" />
            }
            label={t('enabled')}
          />
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button autoFocus onClick={handleCreateApiKey} color="primary">
            {t('ok')}
          </Button>
        </CustomDialogActions>
      </Dialog>

      {/* <SnackBarAlert onClose={handleClose} message={"success message"} type={AlertMessageType.sucess} open={open} /> */}
    </>
  )
}
