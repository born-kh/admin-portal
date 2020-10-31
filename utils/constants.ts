import { AlertMessageType } from '@components/common/SnackbarAlert'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import indigo from '@material-ui/core/colors/indigo'
import grey from '@material-ui/core/colors/grey'
export const activeStepColor = indigo[500] // #f44336
export const approveStepColor = green[500] // #e040fb
export const rejectStepColor = red[500]
export const newDocStepColor = grey[500]
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

export const initialAlertData = { type: AlertMessageType.sucess, message: '', open: false }

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

export const applicationOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: 'NEW', label: 'NEW' },
  { value: 'PENDING', label: 'PENDING' },
  { value: 'APPROVED', label: 'APPROVED' },
  { value: 'REJECTED', label: 'REJECTED' },
]

export const dateOptions = [
  { value: 'ALL', label: 'ALL' },
  { value: 0, label: 'CREATED' },
  { value: 1, label: 'UPDATED' },
  { value: 3, label: 'SUBMITED' },
  { value: 4, label: 'APPROVED' },
]

export const DOCUMENT_FILE_URL = 'http://10.7.20.206:9002/doc/'

export const API_URLS = {
  SEARCH_USER: '/searchuser',
  GET_ACCOUNT_SESSIONS: '/getaccountsessions',
  LOGIN: '/login',
  GET_PRECENSE_INFO: '/getprecenseinfo',
  SUSPEND_SESSION: '/suspendsession',
  REMOVE_SESSION: '/removesession',
  SET_TRACER: '/settracer',
  SET_PASSWORD: '/setpassword',
  SEARCH_TRACER: '/searchtracer',
  REMOVE_TRACER: '/removetracer',
  GET_PERMISSIONS: '/getpermissions',
  GET_PROFILE_DATA: '/getprofiledata',
  LOGOUT: '/logout',
  GET_APPLICATIONS: '/getapplications',
  GET_APPLICATIONS_ANY: '/getapplicationsany',
  GET_DOCUMENTS: '/getdocuments',
  GET_APPLICATIONS_BY_NAME: '/getapplicationsearch',
  SET_APPLICATION_STATUS: 'setapplicationstatus',
  SET_DOCUMENT_STATUS: 'setdocumentstatus',
  SET_DOCUMENT_FIELDS: '/setdocumentfields',
  SET_DOCUMENT_NOTE: '/setdocumentnote',
  SET_DOCUMENT_TAGS: '/setdocumenttags',
  GET_DOCUMENT_TYPES: '/getdocumenttypes',
  DELETE_DOCUMENT: '/deletedocument',
  GET_APPLICATIONS_BY_ACCOUNT: '/getapplicationsbyaccount',
  CHECK_PASSPORT_NUMBER: '/checkpassportnumber',
  GET_APIKEYS: 'getapikeys',
  CREATE_APIKEY: 'createapikey',
  UPDATE_APIKEY_URL: 'updateapikey',
  REFRESH_SESSION: '/refreshsession',
}

export const rejectMessages = [
  { selfie: 'Отсутствует сэлфи пользователя' },
  { selfie: 'Фото гражданина на паспорте не совпадает с сэлфи пользователя.' },
  {
    selfie: 'Сэлфи не является фотографией пользователя, а снимком с фотографии. ',
  },
  {
    passport: 'Фотография паспорта размытая, невозможно рассмотреть информацию.',
  },
  { passport: 'Отсутствует фотография паспорта.' },

  {
    passport: 'Отсутствует фотография второй стороны паспорта гражданина Республики Таджикистан.',
  },
  {
    passport: 'Отсутствует фотография лицевой стороны паспорта гражданина Республики Таджикистан.',
  },
  {
    passport: 'Загруженный документ не является паспортом гражданина Республики Таджикистан.',
  },
  { passport: 'Паспорт в кадре находится не полностью.' },
  {
    passport: 'Фото паспорта сделано в темном помещении, невозможно различить данные.',
  },
  {
    passport: 'Фото паспорта сделано не с реального документа а является фотографией скриншота с другого устройства.',
  },
  { passport: 'Фото паспорта является цветной или черно-белой копией.' },

  { passport: 'Истек срок действия загруженного документа.' },
  { passport: 'На фотографии документа присутствуют блики.' },
]
