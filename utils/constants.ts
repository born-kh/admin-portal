export const NAVIGATOR = {
  userManager: {
    path: '/user-manager',
    name: 'User Manager',
  },
  tracerManager: {
    path: '/tracer-manager',
    name: 'Tracer Manager',
  },
  documentManager: {
    path: '/document-manager',
    name: 'Document Manager',
  },
  apiKeyManager: {
    path: '/api-key-manager',
    name: 'API Key Manager',
  },
  statistics: {
    path: '/statistics',
    name: 'Statistics',
  },
  settings: {
    path: '/settings',
    name: 'Settings',
  },
}
export enum AUTH_STATUS {
  unknown = 'unknown',
  loggedOn = 'logged on',
  loggedOut = 'logged out',
}

export const SESSION_TOKEN = 'session_token'
export const USER_PERMISSION = 'user_permissions'
export const permissions = [
  'TAP_MODIFY_API_KEY_MANAGER',
  'TAP_MODIFY_USER_MANAGER',
  'TAP_MODIFY_STATISTICS',
  'TAP_MODIFY_TRACER_MANAGER',
  'TAP_MODIFY_PASSPORT_MANAGER',
  'TAP_MODIFY_SETTINGS',
  'TAP_GET_PRESENCE_INFO',
  'TAP_SUSPEND_SESSION',
  'TAP_GET_SESSIONS',
  'TAP_REMOVE_SESSION',
  'TAP_SET_TRACER',
  'TAP_SEARCH_TRACER',
  'TAP_REMOVE_TRACER',
  'TAP_SEARCH_USER',
  'TAP_SET_PASSWORD',
  'TAP_GET_ACCOUNTS',
  'TAP_GET_APPLICATIONS',
  'TAP_GET_DOCUMENTS',
  'TAP_GET_APPLICATIONS_SEARCH',
  'TAP_SET_APPLICATION_STATUS',
  'TAP_SET_DOCUMENT_STATUS',
  'TAP_SET_DOCUMENT_FIELDS',
  'TAP_SET_DOCUMENT_NOTE',
  'TAP_SET_DOCUMENT_TAGS',
  'TAP_GET_DOCUMENT_TYPES',
  'TAP_DELETE_DOCUMENT',
  'TAP_GET_APIKEYS',
  'TAP_UPDATE_APIKEYS',
  'TAP_CREATE_APIKEYS',
  'TAP_CREATE_APPLICATIONS_ANY',
  'TAP_CHECK_PASSPORT_NUMBER',
  'TAP_GET_ALL_SETTINGS',
  'TAP_CREATE_SETTINGS',
  'TAP_UPDATE_SETTINGS',
  'TAP_DELETE_SETTINGS',
  'TAP_SET_SYSTEM_SETTINGS',
  'TAP_GET_SYSTEM_SETTINGS',
  'TAP_GET_APPLICATION_BY_ACCOUNT',
]

export const ERROR_CODES = {
  password: {
    wrong: 'auth/wrong-password',
  },
  unknown: 'unknown',
}

