import { useState, useEffect } from 'react'

import MaterialTable from 'material-table'
import useTranslation from 'hooks/useTranslation'

import moment from 'moment'
import { Paper, Button, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import * as Yup from 'yup'

import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
import { initialAlertData, LangType } from '@utils/constants'
import { useStylesStatistics } from 'styles/statistics-styles'
import { useFormik } from 'formik'
import { IAuthCode } from '@Interfaces'
import { ServiceStatisticsManager } from '@Services/API/StatisticsManager'

export default function Authencation() {
  const classes = useStylesStatistics()
  const [authCodes, setAuthCodes] = useState<IAuthCode[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [resendCodeId, setResendCodeId] = useState<string | null>(null)

  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  useEffect(() => {
    hanldeFetchData({})
  }, [])

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: Yup.object().shape({
      search: Yup.string().min(5, 'Too Short!').max(15, 'Too Long!').required('Required'),
    }),

    onSubmit: (values) => {
      hanldeFetchData({ identifier: values.search })
    },
  })

  const hanldeFetchData = (params: { identifier?: string }) => {
    setIsLoading(true)
    setAuthCodes([])
    ServiceStatisticsManager.getAuthCodeList(params)
      .then((res) => {
        if (res.result) {
          setAuthCodes(res.result.authCodes)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }

  const handleSendResendSMS = (codeId: string, phoneNumber: string) => {
    setResendCodeId(codeId)
    ServiceStatisticsManager.resendCode({ lang: 'en', codeId, phoneNumber, sms: true })
      .then(() => {
        setAlertData({ message: `Resend SMS success`, type: AlertMessageType.sucess, open: true })
      })
      .catch((e) => {
        console.log(e.message)
        setAlertData({ message: `Resend SMS error` + e.message, type: AlertMessageType.error, open: true })
      })
  }

  const { t } = useTranslation()
  const searchError = formik.errors.search !== undefined && formik.touched.search

  return (
    <>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <form onSubmit={formik.handleSubmit}>
        <Paper className={classes.paper}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="search"
            label={t('search')}
            name="search"
            className={classes.textField}
            onChange={formik.handleChange}
            value={formik.values.search}
            error={searchError}
            helperText={searchError ? formik.errors.search : null}
          />

          <Button variant="contained" className={classes.button} color="primary" type="submit" disabled={isLoading}>
            {t('search')}
          </Button>
        </Paper>
      </form>
      <MaterialTable
        title={t('authCodes')}
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: '' } }}
        columns={[
          { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 75 },
          { title: t('identifier'), field: 'identifier' },
          { title: t('type'), field: 'type' },
          { title: t('ip'), field: 'ip' },
          { title: t('platform'), field: 'platform' },
          { title: t('version'), field: 'appVersion' },

          {
            title: t('deliveryType'),
            field: 'deliveryType',
          },
          {
            title: t('createdAt'),
            field: 'createdAt',
            render: (rowData) => rowData.createdAt && moment(rowData.createdAt).format('DD MMM YYYY HH:mm'),
          },
          {
            title: t('activated'),
            field: 'activated',
          },

          {
            title: t('resendCode'),
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="primary"
                  disabled={resendCodeId === rowData.id || rowData.activated}
                  onClick={() => handleSendResendSMS(rowData.id, rowData.identifier)}
                  endIcon={<SendIcon />}
                >
                  {t('send')}
                </Button>
              ),
          },
        ]}
        data={authCodes}
        options={{
          pageSize: 10,
          sorting: false,
          exportButton: true,
        }}
      />
    </>
  )
}
