export const SERVICE_URL =
  process.env.REACT_APP_API_GATEWAY_URL || 'http://localhost:8080';
export const REACT_APP_BASE_NAME = process.env.REACT_APP_BASE_NAME || '';
export const SEARCH_USER = '/searchuser';
export const GET_ACCOUNT_SESSIONS = '/getaccountsessions';
export const LOGIN = '/login';
export const GET_PRECENSE_INFO = '/getprecenseinfo';
export const SUSPEND_SESSION = '/suspendsession';
export const REMOVE_SESSION = '/removesession';
export const SET_TRACER = '/settracer';
export const SET_PASSWORD = '/setpassword';
export const SEARCH_TRACER = '/searchtracer';
export const REMOVE_TRACER = '/removetracer';
export const GET_PERMISSIONS = '/getpermissions';
export const GET_PROFILE_DATA = '/getprofiledata';
export const LOGOUT = '/logout';

export const GET_APPLICATIONS = '/getapplications';
export const GET_DOCUMENTS = '/getdocuments';
export const GET_APPLICATIONS_BY_NAME = '/getapplicationsearch';
export const SET_APPLICATION_STATUS = 'setapplicationstatus';
export const SET_DOCUMENT_STATUS = 'setdocumentstatus';
export const SET_DOCUMENT_FIELDS = '/setdocumentfields';
export const SET_DOCUMENT_NOTE = '/setdocumentnote';
export const SET_DOCUMENT_TAGS = '/setdocumenttags';
export const GET_DOCUMENT_TYPES = '/getdocumenttypes';
export const DELETE_DOCUMENT = '/deletedocument';
export const GET_APPLICATIONS_BY_ACCOUNT = '/getapplicationsbyaccount';

export const GET_APIKEYS = 'getapikeys';
export const CREATE_APIKEY = 'createapikey';
export const UPDATE_APIKEY_URL = 'updateapikey';
