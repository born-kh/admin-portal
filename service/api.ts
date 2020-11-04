import axios from '@utils/instance'
import { API_URLS } from '@utils/constants'
import { AuthParams } from '@interfaces/auth'
import * as resTypes from '@interfaces/api'
import { TracerSearchParamsType } from '@interfaces/tracer-manager'
import { SearchTypeParams, Account } from '@interfaces/user-manager'
import { Fields } from '@interfaces/document-manager'
import {
  ApiKeysResponse,
  ApiKeyCreateParams,
  ApiKeyCreateResponse,
  ApiKeyUpdateParams,
} from '@interfaces/apiKey-manager'

/* AUTH API */

export const authAPI = {
  async login(params: AuthParams) {
    const response = await axios.post<resTypes.LoginResponse>(API_URLS.LOGIN, params)
    return response
  },

  async logout() {
    const response = await axios.post<resTypes.LogoutResponse>(API_URLS.LOGOUT, { reason_note: 'User request' })
    return response
  },

  async fetchPermissions(permissions: string[], session_token: string) {
    const response = await axios.post<resTypes.FetchPermissionsResponse>(API_URLS.GET_PERMISSIONS, {
      permissions,
      metadata: {
        headers: { Authorization: session_token },
      },
    })
    return response
  },

  async refreshSession() {
    const response = await axios.post<resTypes.LoginResponse>(API_URLS.REFRESH_SESSION)
    return response
  },
}

/* User  Manager API */

export const userAPI = {
  async searchUser(paramsList: SearchTypeParams[]) {
    let accounts: Account[] = []
    for (let params of paramsList) {
      const response = await axios.post<resTypes.SearchUserResponse>(API_URLS.SEARCH_USER, params)
      if (response.status === 200) {
        accounts = accounts.concat(response.data.accounts)
      }
    }

    return accounts
  },
  async setPassword(params: any) {
    const response = await axios.post<resTypes.SetPasswordResponse>(API_URLS.SET_PASSWORD, params)
    return response
  },
}
/* Tracer Manager API */

export const tracerAPI = {
  async searchTracer(params: TracerSearchParamsType) {
    const response = await axios.post<resTypes.FetchSessionsResponse>(API_URLS.SEARCH_TRACER, params)
    return response
  },
}
/* Session Manager API */

export const sessionAPI = {
  async fetchAccountSessions(params: { accountID: string }) {
    const response = await axios.post<resTypes.FetchSessionsResponse>(API_URLS.GET_ACCOUNT_SESSIONS, params)
    return response
  },
  async setTracer(params: { sessionID: string; isTracing: boolean }) {
    const response = await axios.post<resTypes.EmptyResponse>(API_URLS.SET_TRACER, params)
    return response
  },
  async suspendSession(params: { sessionID: string; isSuspended: boolean }) {
    const response = await axios.post<resTypes.EmptyResponse>(API_URLS.SUSPEND_SESSION, params)
    return response
  },
  async removeSession(sessionID: string) {
    const response = await axios.post<resTypes.EmptyResponse>(API_URLS.REMOVE_SESSION, { sessionID })
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
    const response = await axios.post<resTypes.FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS, params)
    return response
  },
  async fetchApplicationsAny(params: any) {
    const response = await axios.post<resTypes.FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS_ANY, params)
    return response
  },
  async fetchApplicationByAccount(params: { accountID: string }) {
    const response = await axios.post<resTypes.FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS_BY_ACCOUNT, params)
    return response
  },
  async fetchApplicationsByName(params: any) {
    const response = await axios.post<resTypes.FetchApplicationsResponse>(API_URLS.GET_APPLICATIONS_BY_NAME, params)
    return response
  },
  async fetchDocuments(params: any) {
    const response = await axios.post<resTypes.FetchDocumentsResponse>(API_URLS.GET_DOCUMENTS, params)
    return response
  },
  async fetchDocumentTypes(params: any) {
    const response = await axios.post<resTypes.FetchDocumentTypesResponse>(API_URLS.GET_DOCUMENT_TYPES, params)
    return response
  },

  async setApplicationStatus(params: resTypes.SetApplicationStatusParams) {
    const response = await axios.post<resTypes.DocumentMessageResponse>(API_URLS.SET_APPLICATION_STATUS, params)
    return response
  },
  async setDocumentStatus(params: resTypes.SetDocumentStatusParams) {
    const response = await axios.post<resTypes.DocumentMessageResponse>(API_URLS.SET_DOCUMENT_STATUS, params)
    return response
  },
  async setDocumentFields(params: { documentID: string; fields: Fields }) {
    console.log(params)
    const response = await axios.post<resTypes.DocumentMessageResponse>(API_URLS.SET_DOCUMENT_FIELDS, params)
    return response
  },
  async setDocumentNote(params: any) {
    const response = await axios.post<resTypes.DocumentMessageResponse>(API_URLS.SET_DOCUMENT_NOTE, params)
    return response
  },
  async setDocumentTags(params: any) {
    const response = await axios.post<resTypes.DocumentMessageResponse>(API_URLS.SET_DOCUMENT_TAGS, params)
    return response
  },

  async deleteDocument(params: { documentID: string }) {
    const response = await axios.post<resTypes.DocumentMessageResponse>(API_URLS.DELETE_DOCUMENT, params)
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

//   export const settingsAPI = {
//     async getAllSettings() {
//       return axios.post('getallsettings', {}).then(response => {
//         return response;
//       });
//     },
//     async createSettings(params) {
//       return axios.post('createsettings', params).then(response => {
//         return response;
//       });
//     },
//     async updateSettings(params) {
//       return axios.post('updatesettings', params).then(response => {
//         return response;
//       });
//     },
//     async deleteSettings(params) {
//       return axios.post('deletesettings', params).then(response => {
//         return response;
//       });
//     },
//     async setSettings(params) {
//       return axios.post('setsystemsettings', params).then(response => {
//         return response;
//       });
//     },
//     async getSettings() {
//       return axios.post('getsystemsettings', {}).then(response => {
//         return response;
//       });
//     }
//   };
