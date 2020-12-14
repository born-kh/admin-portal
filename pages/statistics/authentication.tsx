import { useState, useEffect } from 'react'
import { IAuthCode } from '@interfaces/statistics'
import MaterialTable from 'material-table'
import useTranslation from 'hooks/useTranslation'
import { statisticsAPI, userAPI } from 'service/api'
import moment from 'moment'
import { Paper, Button, TextField } from '@material-ui/core'
import Title from '@components/common/Title'
import SendIcon from '@material-ui/icons/Send'
import { useStyles } from './styles'
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
import { initialAlertData, LangType } from '@utils/constants'

export default function () {
  const classes = useStyles()
  const [authCodes, setAuthCodes] = useState<IAuthCode[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
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

  const hanldeFetchData = (params: { identifier?: string }) => {
    setAuthCodes([])
    setIsLoading(true)
    statisticsAPI
      .getAuthCodes(params)
      .then((response) => {
        console.log('response', response)
        setAuthCodes(response.data.authCodes)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log('error', error)
        setIsLoading(false)
      })
  }

  const handleSendResendSMS = (codeId: string, phoneNumber: string) => {
    setResendCodeId(codeId)
    statisticsAPI
      .resendCode({ lang: 'en', codeId, phoneNumber, sms: true })
      .then(() => {
        setAlertData({ message: `Resend SMS success`, type: AlertMessageType.sucess, open: true })
        setResendCodeId(null)
      })
      .catch((e) => {
        setAlertData({ message: `Resend SMS error` + e.message, type: AlertMessageType.error, open: true })
        setResendCodeId(null)
      })
  }

  const { t } = useTranslation()

  return (
    <>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <Paper className={classes.paper}>
        <Title>{t('search')}</Title>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="search"
          label={t('search')}
          name="search"
          className={classes.textField}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          value={search}
        />

        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          type="button"
          onClick={() => {
            hanldeFetchData(search.trim().length > 0 ? { identifier: search } : {})
          }}
        >
          {t('search')}
        </Button>
      </Paper>
      <MaterialTable
        title={t('authCodes')}
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: '' } }}
        columns={[
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
                  disabled={resendCodeId === rowData.id}
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
          sorting: false,
          paging: false,
        }}
      />
    </>
  )
}
