import MaterialTable from 'material-table'
import { TracerTableProps } from '@interfaces/tracer-manager'
import Typography from '@material-ui/core/Typography'
import { Accordion, AccordionSummary, AccordionDetails } from './common/Accordion'

export default function (props: TracerTableProps) {
  return (
    <MaterialTable
      title="Sessions"
      isLoading={props.isLoading}
      localization={{ body: { emptyDataSourceMessage: `There are no ${props.type}` } }}
      columns={[
        { title: '№', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 75 },
        { title: 'Ts', field: 'ts' },
        { title: 'Method', field: 'response.method' },
        { title: 'Account ID', field: 'account_id' },
        { title: 'Session ID', field: 'session_id' },
      ]}
      data={props.data}
      options={{
        showTitle: false,
      }}
      detailPanel={[
        {
          tooltip: 'Show Detail',
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
