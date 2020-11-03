import MaterialTable from 'material-table'
import { Tracer } from '@interfaces/tracer-manager'
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 26,
    '&$expanded': {
      minHeight: 26,
    },
  },
  content: {
    '&$expanded': {
      margin: '6px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails)

type PropsType = {
  data: Tracer[]
  isLoading: boolean
  type: string
}
export default function (props: PropsType) {
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
