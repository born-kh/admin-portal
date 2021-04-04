import { Dictionary } from 'lodash'

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

export interface LoginResponse {
  result: LoginResult
}

export interface LoginResult {
  data: AuthResponseData
  return_code: number
  return_note: string
  result: boolean
}
export interface LogoutResponse {
  code: number
  note: string
  result: boolean
}

export interface FetchPermissionsResponse {
  result: ResultPermissions
}
export interface ResultPermissions {
  data: Dictionary<string>
  return_code: number
  return_note: string
  result: boolean
}
