export interface AuthParams {
  app_uuid: string
  domain: string
  force_session: boolean
  password: string
  project_uuid: string | null
  user_headers: {} | null
  user_ip: string
  username: string
}



export interface SessionData {
  access_domains: string[]
  access_profiles: string[]
  account_uuid: string
  code: number
  data_source_profiles: string[]
  expire_ts: string
  groups: string[]
  inactivity_interval: string
  manager_uuid: string
  note: string
  project_name: string
  project_note: string
  project_uuid: string
  session_token: string
  timezone: string
  user_headers: {}
  username: string
}

export interface AuthResponseData {
  authorization: boolean
  session_data: SessionData
}
