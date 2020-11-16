/* custom axios */
import axios from '@utils/instance'
/* constants API_URLS */
import { API_URLS } from '@utils/constants'
/* auth interfaces */
import { AuthParams, LoginResponse, LogoutResponse, FetchPermissionsResponse } from '@interfaces/auth'
/* tracer-manager interfaces */
import { TracerSearchParamsType } from '@interfaces/tracer-manager'
/* user-manager interfaces */
import {
  SearchTypeParams,
  Account,
  SearchUserResponse,
  SetPasswordResponse,
  FetchSessionsResponse,
  AccountGetByDateParams,
  AccountGetByDateResponse,
} from '@interfaces/user-manager'
/* document-manager interfaces */
import {
  Fields,
  EmptyResponse,
  FetchApplicationsResponse,
  FetchDocumentsResponse,
  FetchDocumentTypesResponse,
  SetApplicationStatusParams,
  DocumentMessageResponse,
  SetDocumentStatusParams,
} from '@interfaces/document-manager'
/* apiKey-manager interfaces */
import {
  ApiKeysResponse,
  ApiKeyCreateParams,
  ApiKeyCreateResponse,
  ApiKeyUpdateParams,
} from '@interfaces/apiKey-manager'
/* settins interfaces */
import {
  AuthSettings,
  GetAllAuthSettingsResponse,
  AuthSettingsResponse,
  SystemSettings,
  GetSystemSettingsResponse,
  GetAllCallQualityResponse,
  CallQuality,
  GetAllQuestionsResponse,
  Question,
} from '@interfaces/settings'

/* AUTH API */

export const authAPI = {
  async login(params: AuthParams) {
    const response = await axios.post<LoginResponse>(API_URLS.LOGIN, params)
    return response
  },

  async logout() {
    const response = await axios.post<LogoutResponse>(API_URLS.LOGOUT, { reason_note: 'User request' })
    return response
  },

  async fetchPermissions(permissions: string[], session_token: string) {
    const response = await axios.post<FetchPermissionsResponse>(API_URLS.GET_PERMISSIONS, {
      permissions,
      metadata: {
        headers: { Authorization: session_token },
      },
    })
    return response
  },

  async refreshSession() {
    const response = await axios.post<LoginResponse>(API_URLS.REFRESH_SESSION)
    return response
  },
}

/* User  Manager API */

export const userAPI = {
  async searchUser(paramsList: SearchTypeParams[]) {
    let accounts: Account[] = []
    for (let params of paramsList) {
      const response = await axios.post<SearchUserResponse>(API_URLS.SEARCH_USER, params)
      if (response.status === 200) {
        accounts = accounts.concat(response.data.accounts)
      }
    }

    return accounts
  },
  async setPassword(params: any) {
    const response = await axios.post<SetPasswordResponse>(API_URLS.SET_PASSWORD, params)
    return response
  },
  async accountGetByDate(params: AccountGetByDateParams) {
    const response = await axios.post<AccountGetByDateResponse>(API_URLS.ACCOUNT_GET_BY_DATE, params)
    return response
  },
}
/* Tracer Manager API */

export const tracerAPI = {
  async searchTracer(params: TracerSearchParamsType) {
    const response = await axios.post<FetchSessionsResponse>(API_URLS.SEARCH_TRACER, params)
    return response
  },
}
/* Session Manager API */

export const sessionAPI = {
  async fetchAccountSessions(params: { accountID: string }) {
    const response = await axios.post<FetchSessionsResponse>(API_URLS.GET_ACCOUNT_SESSIONS, params)
    return response
  },
  async setTracer(params: { sessionID: string; isTracing: boolean }) {
    const response = await axios.post<EmptyResponse>(API_URLS.SET_TRACER, params)
    return response
  },
  async suspendSession(params: { sessionID: string; isSuspended: boolean }) {
    const response = await axios.post<EmptyResponse>(API_URLS.SUSPEND_SESSION, params)
    return response
  },
  async removeSession(sessionID: string) {
    const response = await axios.post<EmptyResponse>(API_URLS.REMOVE_SESSION, { sessionID })
    return response
  },
  async fetchPresenceInfo(params: any) {
    const response = await axios.post(API_URLS.GET_PRECENSE_INFO, params)
    return response
  },
}

/* document Manager API */

export const documentAPI = {
  async fetchApplications(params: { start: number; count: number }) {
    const response = await axios.post<FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS, params)
    return response
  },
  async fetchApplicationsAny(params: any) {
    const response = await axios.post<FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS_ANY, params)
    return response
  },
  async fetchApplicationByAccount(params: { accountID: string }) {
    const response = await axios.post<FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS_BY_ACCOUNT, params)
    return response
  },
  async fetchApplicationsByName(params: any) {
    const response = await axios.post<FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS_BY_NAME, params)
    return response
  },
  async fetchDocuments(params: { applicationID: string }) {
    const response = await axios.post<FetchDocumentsResponse>(API_URLS.GET_DOCUMENTS, params)
    return response
  },
  async fetchDocumentTypes(params: { setID: string }) {
    const response = await axios.post<FetchDocumentTypesResponse>(API_URLS.GET_DOCUMENT_TYPES, params)
    return response
  },

  async setApplicationStatus(params: SetApplicationStatusParams) {
    const response = await axios.post<DocumentMessageResponse>(API_URLS.SET_APPLICATION_STATUS, params)
    return response
  },
  async setDocumentStatus(params: SetDocumentStatusParams) {
    const response = await axios.post<DocumentMessageResponse>(API_URLS.SET_DOCUMENT_STATUS, params)
    return response
  },
  async setDocumentFields(params: { documentID: string; fields: Fields }) {
    const response = await axios.post<DocumentMessageResponse>(API_URLS.SET_DOCUMENT_FIELDS, params)
    return response
  },
  async setDocumentNote(params: any) {
    const response = await axios.post<DocumentMessageResponse>(API_URLS.SET_DOCUMENT_NOTE, params)
    return response
  },
  async setDocumentTags(params: any) {
    const response = await axios.post<DocumentMessageResponse>(API_URLS.SET_DOCUMENT_TAGS, params)
    return response
  },

  async deleteDocument(params: { documentID: string }) {
    const response = await axios.post<DocumentMessageResponse>(API_URLS.DELETE_DOCUMENT, params)
    return response
  },

  async checkPassportNumber(params: any) {
    const response = await axios.post<{ availabe: string }>(API_URLS.CHECK_PASSPORT_NUMBER, params)
    return response
  },
}

export const apiKeyAPI = {
  async getApiKeys() {
    const response = await axios.post<ApiKeysResponse>(API_URLS.GET_APIKEYS, {})
    return response
  },

  async createApiKey(params: ApiKeyCreateParams) {
    const response = await axios.post<ApiKeyCreateResponse>(API_URLS.CREATE_APIKEY, params)
    return response
  },

  async updateApiKey(params: ApiKeyUpdateParams) {
    const response = await axios.post<ApiKeyCreateResponse>(API_URLS.UPDATE_APIKEY_URL, params)
    return response
  },
}

export const settingsAPI = {
  async getAllAuthSettings() {
    return axios.post<GetAllAuthSettingsResponse>(API_URLS.GET_ALL_AUTH_SETIINGS, {}).then((response) => {
      return response
    })
  },
  async createAuthSettings(params: AuthSettings) {
    return axios.post<AuthSettingsResponse>(API_URLS.CREATE_AUTH_SETTINGS, params).then((response) => {
      return response
    })
  },
  async updateAuthSettings(params: AuthSettings) {
    return axios.post<AuthSettingsResponse>(API_URLS.UPDATE_AUTH_SETTINGS, params).then((response) => {
      return response
    })
  },
  async deleteAuthSettings(params: { id: string }) {
    return axios.post(API_URLS.DELETE_AUTH_SETTINGS, params).then((response) => {
      return response
    })
  },
  async setSystemSettings(params: SystemSettings) {
    return axios.post(API_URLS.SET_SYSTEM_SETTINGS, params).then((response) => {
      return response
    })
  },
  async getSystemSettings() {
    return axios.post<GetSystemSettingsResponse>(API_URLS.GET_SYSTEM_SETTINGS, {}).then((response) => {
      return response
    })
  },
  async getAllCallQulaity() {
    return axios.post<GetAllCallQualityResponse>(API_URLS.GET_ALL_CALL_QUALITY, {}).then((response) => {
      return response
    })
  },
  async createCallQulaity(params: CallQuality) {
    return axios.post(API_URLS.CREATE_CALL_QUALITY, params).then((response) => {
      return response
    })
  },

  async updateCallQulaity(params: CallQuality) {
    return axios.post(API_URLS.UPDATE_CALL_QUALITY, params).then((response) => {
      return response
    })
  },
  async deleteCallQulaity(params: { id: string }) {
    return axios.post(API_URLS.DELETE_CALL_QUALITY, params).then((response) => {
      return response
    })
  },

  async getAllQuestions() {
    return axios.post<GetAllQuestionsResponse>(API_URLS.GET_ALL_QUESTION, {}).then((response) => {
      return response
    })
  },
  async createQuestion(params: Question) {
    return axios.post(API_URLS.CREATE_QUESTION, params).then((response) => {
      return response
    })
  },
  async updateQuestion(params: Question) {
    return axios.post(API_URLS.DELETE_QUESTION, params).then((response) => {
      return response
    })
  },
  async deleteQuestion(params: { id: string }) {
    return axios.post(API_URLS.DELETE_QUESTION, params).then((response) => {
      return response
    })
  },
}
