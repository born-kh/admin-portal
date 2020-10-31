import MaterialTable from 'material-table'
import { Application, Document } from '@interfaces/document-manager'
import Viewer from 'react-viewer'
import VisibilityIcon from '@material-ui/icons/Visibility'
import _ from 'lodash'
import { Button, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import { DOCUMENT_FILE_URL } from '@utils/constants'
import { useState } from 'react'
type PropsType = {
  documents: Document[]
  isLoading: boolean
  handleSetID: (value: string) => void
}
export default function (props: PropsType) {
  let setGroups = _.values(_.groupBy(props.documents, 'documenSet.ID')).map((d) => {
    return {
      setID: d[0].documenSet.ID,
      setName: d[0].documenSet.setName,
      count: d.length,
      documents: d,
    }
  })

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
              <Button
                variant="contained"
                color="primary"
                onClick={() => props.handleSetID(rowData.setID)}
                startIcon={<VisibilityIcon />}
              >
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
          // disabled: docID !== null,
          render: (d) => {
            console.log(d)
            return d && d.documents && <DetailPanel documents={props.documents} />
          },
        },
      ]}
    />
  )
}

export const DetailPanel = ({ documents }: { documents: Document[] }) => {
  const [docID, setDocID] = useState<string | null>(null)
  return (
    <MaterialTable
      columns={[
        { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1 },
        { title: 'File Original Name', field: 'fileInfo.originalName' },
        { title: 'File Size', field: 'fileInfo.size' },
        { title: 'File Upload IP', field: 'fileInfo.uploadIP' },
        {
          title: 'Picture',
          field: '',
          render: (rowData) =>
            rowData && (
              <div style={{ height: 100, width: 100 }}>
                <img
                  alt=""
                  onClick={() => {
                    setDocID(rowData.ID)
                  }}
                  src={DOCUMENT_FILE_URL + rowData.ID}
                  style={{
                    cursor: 'pointer',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    verticalAlign: 'middle',
                  }}
                />
                {/* <Viewer
                  zIndex={9999}
                  visible={docID === rowData.ID}
                  onClose={() => setDocID(null)}
                  images={[{ src: DOCUMENT_FILE_URL + rowData.ID, alt: '' }]}
                /> */}
              </div>
            ),
        },
      ]}
      data={documents}
      options={{
        search: false,
        showTitle: false,

        maxBodyHeight: 600,

        paging: false,
        headerStyle: {
          position: 'sticky',
          top: 0,
          zIndex: 0,
        },
      }}
    />
  )
}
