import MaterialTable from 'material-table'
import { TracerTableProps } from '@interfaces/tracer-manager'
import Typography from '@material-ui/core/Typography'
import { Accordion, AccordionSummary, AccordionDetails } from './common/Accordion'
import useTranslation from 'hooks/useTranslation'
import { Paper } from '@material-ui/core'

export default function TracerTable(props: TracerTableProps) {
  const { t } = useTranslation()
  return (
    <MaterialTable
      title={t('sessions')}
      isLoading={props.isLoading}
      localization={{
        body: { emptyDataSourceMessage: props.type === 'errors' ? t('noErrors') : t('noMessages') },
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
        { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 75 },
        { title: t('dateTime'), field: 'ts' },
        { title: t('method'), field: 'response.method' },
        { title: t('accountId'), field: 'account_id' },
        { title: t('sesssionId'), field: 'session_id' },
      ]}
      data={props.data}
      components={{
        Container: (props) => <Paper {...props} elevation={0} />,
      }}
      options={{
        showTitle: false,
      }}
      detailPanel={[
        {
          tooltip: t('showDetail'),
          render: (d) => {
            return (
              d.request.id && (
                <div style={{ marginLeft: 20, background: '#F0F5F5' }}>
                  <Accordion square expanded>
                    <AccordionSummary aria-controls="panel1d-content" id="method">
                      <Typography>method:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{d.request.method}</Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion square expanded>
                    <AccordionSummary aria-controls="panel1d-content" id="id1">
                      <Typography>id:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{d.request.id}</Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion square expanded>
                    <AccordionSummary aria-controls="panel1d-content" id="version">
                      <Typography>version:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{d.request.version}</Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion square expanded>
                    <AccordionSummary aria-controls="panel1d-content" id="metadata">
                      <Typography>metadata:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <pre>{JSON.stringify(d.request.metadata, null, 2)}</pre>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion square expanded>
                    <AccordionSummary aria-controls="panel1d-content" id="params">
                      <Typography>params:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <pre>{JSON.stringify(d.request.params, null, 2)}</pre>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion square expanded>
                    <AccordionSummary aria-controls="panel1d-content" id="result">
                      <Typography>result:</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <pre>{JSON.stringify(d.response.result, null, 2)}</pre>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )
            )
          },
        },
      ]}
    />
  )
}
