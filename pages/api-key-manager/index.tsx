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
// apiKey-manager REST APIS
import { apiKeyAPI } from 'service/api'
// apiKey-manager interfaces
import { ApiKey, ApiKeyUpdateParams, ApiKeyCreateParams, Platforms } from '@interfaces/apiKey-manager'
import useTranslation from 'hooks/useTranslation'

///api-key-manager component
export default function ApiKeyManager() {
  const [apiKeys, setAPiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      validFrom: '',
      validTo: '',
      enabled: true,
      version: '',
      platform: Platforms.android,
    } as ApiKeyCreateParams,

    onSubmit: (values) => {},
  })

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleUpdateApiKey = (id: number) => {
    const apiKey = apiKeys.find((item) => item.id === id)
    if (apiKey) {
      const params: ApiKeyUpdateParams = {
        id: apiKey.id,
        key: apiKey.apiKey,
        scopes: apiKey.scopes,
        validFrom: apiKey.validFrom,
        validTo: apiKey.validTo,
        enabled: !apiKey.enabled,
        cacheExpiration: apiKey.cacheExpiration,
      }

      apiKeyAPI
        .updateApiKey(params)
        .then((response) => {
          setAPiKeys((prevApiKeys) => {
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

  const handleCreateApiKey = () => {
    console.log(formik.values)
    apiKeyAPI
      .createApiKey({
        ...formik.values,
        validTo: new Date(formik.values.validTo).toISOString().split('.')[0] + 'Z',
        validFrom: new Date(formik.values.validFrom).toISOString().split('.')[0] + 'Z',
      })
      .then((response) => {
        setAPiKeys((prevApiKeys) => {
          return [...prevApiKeys, response.data.apiKey]
        })
        setIsOpen(false)
      })
      .catch((e) => {
        setIsOpen(false)
        console.log(e)
      })
  }
  useEffect(() => {
    setIsLoading(true)
    apiKeyAPI
      .getApiKeys()
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setAPiKeys(response.data.apiKeys)
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
      <MaterialTable
        title={t('apiKeys')}
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: t('noApiKeys') } }}
        columns={[
          { title: t('ApiKey'), field: 'apiKey' },
          { title: t('platform'), field: 'platform' },
          { title: t('version'), field: 'version' },
          { title: t('validFrom'), field: 'validFrom' },
          { title: t('validTo'), field: 'validTo' },

          {
            title: t('expiration'),
            field: 'cacheExpiration',
          },
          {
            title: t('createdAt'),
            field: 'createdAt',
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
        data={apiKeys}
        options={{
          sorting: false,
          search: false,
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
            name="validFrom"
            id="validFrom"
            style={{ width: 300 }}
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
