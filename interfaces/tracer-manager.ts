export interface TracerSearchParamsType {
  search?: string
  fromTS: string
  toTS: string
  accountID?: string
}

export interface Tracer {
  ts: string
  account_id: string
  session_id: string
  response: any
  request: any
  tableData: any
}

export interface TracerResult {
  messages: Tracer[]
  errors: Tracer[]
}

export interface TracerTableProps {
  data: Tracer[]
  isLoading: boolean
  type: string
}
