import React, { useState, useEffect } from 'react'
import Dashboard from '@components/Dashboard'
import Button from '@material-ui/core/Button'
import {
  TextField,
  Dialog,
  Switch,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { useFormik } from 'formik'

import MaterialTable from 'material-table'
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'
import { apiKeyAPI } from 'service/api'
import { ApiKey, ApiKeyUpdateParams, ApiKeyCreateParams, Platforms } from '@interfaces/apiKey-manager'
import MySelect from '@material-ui/core/Select'
export default function () {
  const [apiKeys, setAPiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
  useEffect(() => {
    setIsLoading(true)
    apiKeyAPI
      .getApiKeys()
      .then((response) => {
        if (response.status === 200) {
          setAPiKeys(response.data.apiKeys)
        }
        setIsLoading(false)
      })
      .catch(() => {
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
    <Dashboard title={'user-manager'}>
      <MaterialTable
        title="API Keys"
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: 'There are no api keys' } }}
        columns={[
          { title: 'Platform', field: 'platform' },
          { title: 'Version', field: 'version' },
          { title: 'Valid From', field: 'validFrom' },
          { title: 'Valid To', field: 'validTo' },

          {
            title: 'Expiration',
            field: 'cacheExpiration',
          },
          {
            title: 'Created At',
            field: 'createdAt',
          },
          {
            title: 'Enabled',
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
            tooltip: 'Create api key',
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
          Create APi Key
        </CustomDialogTitle>
        <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="version"
            name="version"
            label="version"
            onChange={formik.handleChange}
            value={formik.values.version}
          />

          <FormControl variant="outlined" style={{ margin: '20px 5px' }}>
            <InputLabel id="platform">Platform</InputLabel>

            <MySelect
              labelId="platform"
              id="platform"
              fullWidth
              name="platform"
              style={{ width: 300 }}
              value={formik.values.platform}
              onChange={formik.handleChange}
              label="Set Type Date"
            >
              {platforms}
            </MySelect>
          </FormControl>
          <TextField
            label="Valid From"
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
            label="Valid To"
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
            label="Enabled"
          />
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Create
          </Button>
        </CustomDialogActions>
      </Dialog>

      {/* <SnackBarAlert onClose={handleClose} message={"success message"} type={AlertMessageType.sucess} open={open} /> */}
    </Dashboard>
  )
}
