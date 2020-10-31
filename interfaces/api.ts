import { AuthResponseData } from './auth'
import { Dictionary } from 'lodash'
import { Account, AccountSessionsData, AccountStatus } from './user-manager'
import { Application, Document, DocumentTypes, ApplicationStatus, DocumentStatus } from './document-manager'
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

export interface SearchUserResponse {
  accounts: Account[]
}

export interface SetPasswordResponse {
  message: string
  success: boolean
}
export interface FetchSessionsResponse {
  sessions: AccountSessionsData[]
}

export interface EmptyResponse {}

export interface FetchApplicationsResponse {
  applications: Application[]
}
export interface FetchDocumentsResponse {
  documents: Document[]
}
export interface DocumentMessageResponse {
  message: string
}

export interface FetchDocumentTypesResponse {
  types: DocumentTypes[]
}

export interface SetApplicationStatusParams {
  user: string
  applicationID: string
  status: ApplicationStatus
  documentSetID: string
  reason?: string
}

export interface SetDocumentStatusParams {
  documentTypeID: string
  documentSetID: string
  user: string
  status: DocumentStatus
  applicationID: string
  reason?: string
}
