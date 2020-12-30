//material table lib
import MaterialTable from 'material-table'
//material ui icons
import DetailsIcon from '@material-ui/icons/Details'
//moment js lib
import moment from 'moment'
//material ui components
import { Button, TablePagination, Paper } from '@material-ui/core'
//next router
import { useRouter } from 'next/router'
//document-manager interfaces
import { ApplicationTableProps } from '@interfaces/document-manager'
import useTranslation from 'hooks/useTranslation'
import { NAVIGATOR } from '@utils/constants'

export default function ApplicationTable(props: ApplicationTableProps) {
  const router = useRouter()
  const { t } = useTranslation()
  const { data, handleChangePage, handleChangePageSize } = props
  const isUserManagerPage = router.route.includes(NAVIGATOR.userManager.path)
  console.log(props)
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

        // {
        //   title: t('createdAt'),
        //   field: 'createdAt',

        //   render: (rowData) => rowData.createdAt && moment(rowData.createdAt).format('DD MMM YYYY HH:mm'),
        // },
        // {
        //   title: t('updatedAt'),
        //   field: 'updatedAt',

        //   render: (rowData) => rowData.updatedAt && moment(rowData.updatedAt).format('DD MMM YYYY HH:mm'),
        // },
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
                  let query = {
                    id: rowData.applicationID,
                    applications: router.query.applications,
                  } as any

                  if (isUserManagerPage) {
                    query.accountID = router.query.id
                  }
                  router.push({
                    pathname: '/document-manager/[id]',
                    query,
                  })
                }}
                startIcon={<DetailsIcon />}
              >
                {t('detail')}
              </Button>
            ),
        },
      ]}
      data={data ? data.applications : props.applications ? props.applications : []}
      components={{
        Pagination: (props) => {
          if (data && handleChangePage) {
            return (
              <TablePagination
                {...props}
                rowsPerPage={data.pageSize}
                count={data.totalCount}
                page={data.page}
                onChangePage={(e, page) => handleChangePage(page)}
              />
            )
          }
          return null
        },

        // Container: (props) => <Paper {...props} elevation={0} />,
      }}
      onChangeRowsPerPage={(pageSize) => {
        handleChangePageSize ? handleChangePageSize(pageSize) : null
      }}
      options={{
        pageSize: data ? data.pageSize : 20,
        showTitle: props.title !== undefined,
        paging: !!data,
        headerStyle: {
          zIndex: 0,
        },
      }}
    />
  )
}
