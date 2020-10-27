import MaterialTable from 'material-table'
import { Application, Document } from '@interfaces/document-manager'
import DetailsIcon from '@material-ui/icons/Details'
import VisibilityIcon from '@material-ui/icons/Visibility'
import _ from 'lodash'
import { Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
type PropsType = {
  documents: Document[]
  isLoading: boolean
}
export default function (props: PropsType) {
  const router = useRouter()
  let setGroups = _.values(_.groupBy(props.documents, 'documenSet.ID')).map((d) => {
    return {
      setID: d[0].documenSet.ID,
      setName: d[0].documenSet.setName,
      count: d.length,
      documents: d,
    }
  })
  console.log(setGroups)

  return (
    <MaterialTable
      title="Set Groups"
      isLoading={props.isLoading}
      localization={{ body: { emptyDataSourceMessage: `There are no sets` } }}
      columns={[
        {
          title: 'Set Name',
          field: 'setName ',
          render: (rowData) => rowData && rowData.setName,
        },
        { title: 'Documents', field: 'count' },

        {
          title: 'Begin review',
          field: '',

          render: (rowData) =>
            rowData && (
              <Button variant="contained" color="primary" onClick={() => {}} startIcon={<VisibilityIcon />}>
                Begin review
              </Button>
            ),
        },
      ]}
      data={setGroups}
      options={{
        search: false,
        headerStyle: {
          zIndex: 0,
        },
      }}
      detailPanel={[
        {
          tooltip: 'Show Detail',
          render: (d) => {
            console.log(d)
            return (
              d.documents && (
                <MaterialTable
                  title="Documents"
                  columns={[
                    { title: 'File Original Name', field: 'fileInfo.originalName' },
                    { title: 'File Size', field: 'fileInfo.size' },
                    { title: 'File Upload IP', field: 'fileInfo.uploadIP' },
                  ]}
                  data={d.documents}
                  options={{
                    search: false,
                    headerStyle: {
                      zIndex: 0,
                    },
                  }}
                />
              )
            )
          },
        },
      ]}
    />
  )
}
