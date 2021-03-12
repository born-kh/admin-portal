import MaterialTable from 'material-table'

import VisibilityIcon from '@material-ui/icons/Visibility'
import _ from 'lodash'
import { Button } from '@material-ui/core'
import { DOCUMENT_FILE_URL } from '@utils/constants'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import ImageComponent from '@components/common/ImageComponent'
import useTranslation from 'hooks/useTranslation'
import { ISetGroupsProps, IDocument } from '@Interfaces'

const Viewer = dynamic(() => import('react-viewer'), { ssr: false })

export default function Setgroups(props: ISetGroupsProps) {
  const { t } = useTranslation()

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
      title={t('setGroups')}
      isLoading={props.isLoading}
      localization={{
        body: { emptyDataSourceMessage: t('noSets') },
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
          title: t('setName'),
          field: 'setName ',
          render: (rowData) => rowData && rowData.setName,
        },
        { title: t('documents'), field: 'count' },

        {
          title: t('beginReview'),
          field: '',

          render: (rowData) =>
            rowData && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => props.handleSetID(rowData.setID)}
                startIcon={<VisibilityIcon />}
              >
                {t('beginReview')}
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
          tooltip: t('showDetail'),

          render: (d) => {
            console.log(d)
            return d && d.documents && <DetailPanel documents={props.documents} />
          },
        },
      ]}
    />
  )
}

export const DetailPanel = ({ documents }: { documents: IDocument[] }) => {
  const [docID, setDocID] = useState<string | null>(null)
  const { t } = useTranslation()
  return (
    <MaterialTable
      columns={[
        { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1 },
        { title: t('documentType'), field: 'documentType.typeName' },
        { title: t('status'), field: 'status' },

        {
          title: t('image'),
          field: '',
          render: (rowData) =>
            rowData && (
              <div style={{ height: 100, width: 100 }}>
                <ImageComponent ID={rowData.ID} alt="" />
                <Viewer
                  zIndex={9999}
                  visible={docID === rowData.ID}
                  onClose={() => setDocID(null)}
                  images={[{ src: DOCUMENT_FILE_URL + rowData.ID, alt: '' }]}
                />
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
