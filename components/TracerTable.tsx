import MaterialTable from 'material-table'
import { Tracer } from '@interfaces/tracer-manager'
import { Typography } from '@material-ui/core'

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
            console.log(d)
            return (
              d.request.id && (
                <div style={{ background: '#F0F5F5' }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginLeft: '100px',
                    }}
                  >
                    <div>
                      <Typography>Request</Typography>
                      <pre>{JSON.stringify(d.request, null, 2)}</pre>
                    </div>
                    <div>
                      <Typography>Response</Typography>
                      <pre>{JSON.stringify(d.response, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              )
            )
          },
        },
      ]}
    />
  )
}
