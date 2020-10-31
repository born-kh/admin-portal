import MaterialTable from 'material-table'
import { Application } from '@interfaces/document-manager'
import DetailsIcon from '@material-ui/icons/Details'
import moment from 'moment'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'
type PropsType = {
  data: Application[]
  isLoading: boolean
  type: string
  title?: string
}
export default function (props: PropsType) {
  const router = useRouter()
  console.log(router)
  return (
    <MaterialTable
      title={props.title}
      isLoading={props.isLoading}
      localization={{ body: { emptyDataSourceMessage: `There are no ${props.type}` } }}
      columns={[
        {
          title: 'FNLN',
          field: '',

          render: (rowData) => rowData && `${rowData.firstName || ''}  ${rowData.lastName || ''}`,
        },
        { title: 'Status', field: 'status' },
        { title: 'Country ISO Code', field: 'countryISOCode' },

        {
          title: 'Created At',
          field: 'createdAt',

          render: (rowData) => rowData.createdAt && moment(rowData.createdAt).format('DD MMM YYYY HH:mm'),
        },
        {
          title: 'Updated At',
          field: 'updatedAt',

          render: (rowData) => rowData.updatedAt && moment(rowData.updatedAt).format('DD MMM YYYY HH:mm'),
        },
        {
          title: 'Submitted At',
          field: 'submittedAt',

          render: (rowData) => rowData.submittedAt && moment(rowData.submittedAt).format('DD MMM YYYY HH:mm'),
        },
        {
          title: 'Detail Info',
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
                Info
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
