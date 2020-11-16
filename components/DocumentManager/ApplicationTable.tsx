//material table lib
import MaterialTable from 'material-table'
//material ui icons
import DetailsIcon from '@material-ui/icons/Details'
//moment js lib
import moment from 'moment'
//material ui components
import { Button } from '@material-ui/core'
//next router
import { useRouter } from 'next/router'
//document-manager interfaces
import { ApplicationTableProps } from '@interfaces/document-manager'
import useTranslation from 'hooks/useTranslation'

export default function (props: ApplicationTableProps) {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <MaterialTable
      title={props.title}
      isLoading={props.isLoading}
      localization={{
        body: { emptyDataSourceMessage: t('noApplications') },
        toolbar: { searchPlaceholder: t('search') },
        pagination: {
          firstTooltip: t('firstTooltip'),
          lastTooltip: t('lastTooltip'),
          previousTooltip: t('previousTooltip'),
          nextTooltip: t('nextTooltip'),
          labelRowsSelect: t('labelRowsSelect'),
        },
      }}
      columns={[
        {
          title: t('fullName'),
          field: 'firstName',
          searchable: true,
          render: (rowData) => rowData && `${rowData.firstName || ''}  ${rowData.lastName || ''}`,
        },
        { title: t('status'), field: 'status' },
        { title: t('countryIsoCode'), field: 'countryISOCode' },

        {
          title: t('createdAt'),
          field: 'createdAt',

          render: (rowData) => rowData.createdAt && moment(rowData.createdAt).format('DD MMM YYYY HH:mm'),
        },
        {
          title: t('updatedAt'),
          field: 'updatedAt',

          render: (rowData) => rowData.updatedAt && moment(rowData.updatedAt).format('DD MMM YYYY HH:mm'),
        },
        {
          title: t('submittedAt'),
          field: 'submittedAt',

          render: (rowData) => rowData.submittedAt && moment(rowData.submittedAt).format('DD MMM YYYY HH:mm'),
        },
        {
          title: t('detailInfo'),
          field: '',

          render: (rowData) =>
            rowData && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  router.push({
                    pathname: '/document-manager/[id]',
                    query: { id: rowData.applicationID, accountID: rowData.accountID },
                  })
                }}
                startIcon={<DetailsIcon />}
              >
                {t('detail')}
              </Button>
            ),
        },
      ]}
      data={props.data}
      options={{
        showTitle: props.title !== undefined,
        headerStyle: {
          zIndex: 0,
        },
      }}
    />
  )
}
