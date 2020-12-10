import { useState, useEffect } from 'react'
import { IAuthCode } from '@interfaces/statistics'
import MaterialTable from 'material-table'
import useTranslation from 'hooks/useTranslation'
import { statisticsAPI } from 'service/api'

export default function () {
  const [authCodes, setAuthCodes] = useState<IAuthCode[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
    statisticsAPI
      .getAuthCodes()
      .then((response) => {
        setAuthCodes(response.data.authCodes)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const { t } = useTranslation()

  return (
    <>
      <MaterialTable
        title={'Auth Codes'}
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: '' } }}
        columns={[
          { title: t('identifier'), field: 'identifier' },
          { title: t('type'), field: 'type' },
          { title: t('ip'), field: 'ip' },
          { title: t('platform'), field: 'platform' },
          { title: t('appVersion'), field: 'appVersion' },

          {
            title: t('deliveryType'),
            field: 'deliveryType',
          },
          {
            title: t('createdAt'),
            field: 'createdAt',
          },
          {
            title: t('activated'),
            field: 'activated',
          },
        ]}
        data={authCodes}
        options={{
          sorting: false,
          search: false,
        }}
      />
    </>
  )
}
