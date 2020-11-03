export interface TracerSearchParamsType {
  search: string
  fromTS: string
  toTS: string
}

export interface Tracer {
  ts: string
  account_id: string
  session_id: string
  response: any
  request: any
}

export interface TracerResult {
  messages: Tracer[]
  errors: Tracer[]
}
