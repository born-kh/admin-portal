import { AlertMessageType } from '@components/common/SnackbarAlert'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import indigo from '@material-ui/core/colors/indigo'
import grey from '@material-ui/core/colors/grey'
export const activeStepColor = indigo[500] // #f44336
export const primaryText = indigo[500] // #f44336
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

export enum DateConvertType {
  expiry = 'expiry',
  dob = 'dob',
  issue = 'issue',
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
export const genderOptions = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' },
  { value: 'Unknown', label: 'Unknown' },
]

export const nationOptions = [
  { label: 'Afghanistan', value: 'AFG' },
  { label: 'Albania', value: 'ALB' },
  { label: 'Algeria', value: 'DZA' },
  { label: 'American Samoa', value: 'ASM' },
  { label: 'Andorra', value: 'AND' },
  { label: 'Angola', value: 'AGO' },
  { label: 'Anguilla', value: 'AIA' },
  { label: 'Antigua and Barbuda', value: 'ATG' },
  { label: 'Argentina', value: 'ARG' },
  { label: 'Armenia', value: 'ARM' },
  { label: 'Aruba', value: 'ABW' },
  { label: 'Australia', value: 'AUS' },
  { label: 'Austria', value: 'AUT' },
  { label: 'Azerbaijan', value: 'AZE' },
  { label: 'Bahrain', value: 'BHR' },
  { label: 'Bangladesh', value: 'BGD' },
  { label: 'Barbados', value: 'BRB' },
  { label: 'Belarus', value: 'BLR' },
  { label: 'Belgium', value: 'BEL' },
  { label: 'Belize', value: 'BLZ' },
  { label: 'Benin', value: 'BEN' },
  { label: 'Bermuda', value: 'BMU' },
  { label: 'Bhutan', value: 'BTN' },
  { label: 'Bolivia', value: 'BOL' },
  { label: 'Bonaire, Sint Eustatius and Saba', value: 'BES' },
  { label: 'Bosnia and Herzegovina', value: 'BIH' },
  { label: 'Botswana', value: 'BWA' },
  { label: 'Brazil', value: 'BRA' },
  { label: 'British Indian Ocean Territory', value: 'IOT' },
  { label: 'British Virgin Islands', value: 'VGB' },
  { label: 'Brunei Darussalam', value: 'BRN' },
  { label: 'Bulgaria', value: 'BGR' },
  { label: 'Burkina Faso', value: 'BFA' },
  { label: 'Myanmar', value: 'MMR' },
  { label: 'Burundi', value: 'BDI' },
  { label: 'Cambodia', value: 'KHM' },
  { label: 'Cameroon', value: 'CMR' },
  { label: 'Canada', value: 'CAN' },
  { label: 'Cabo Verde', value: 'CPV' },
  { label: 'Cayman Islands', value: 'CYM' },
  { label: 'Central African Republic', value: 'CAF' },
  { label: 'Chad', value: 'TCD' },
  { label: 'Chile', value: 'CHL' },
  { label: 'China', value: 'CHN' },
  { label: 'Colombia', value: 'COL' },
  { label: 'Comoros', value: 'COM' },
  { label: 'Cook Islands', value: 'COK' },
  { label: 'Costa Rica', value: 'CRI' },
  { label: 'Côte dIvoire', value: 'CIV' },
  { label: 'Croatia', value: 'HRV' },
  { label: 'Cuba', value: 'CUB' },
  { label: 'Curaçao', value: 'CUW' },
  { label: 'Cyprus', value: 'CYP' },
  { label: 'Czechia', value: 'CZE' },
  { label: 'Denmark', value: 'DNK' },
  { label: 'Djibouti', value: 'DJI' },
  { label: 'Dominica', value: 'DMA' },
  { label: 'Dominican Republic', value: 'DOM' },
  { label: 'Ecuador', value: 'ECU' },
  { label: 'Egypt', value: 'EGY' },
  { label: 'El Salvador', value: 'SLV' },
  { label: 'Equatorial Guinea', value: 'GNQ' },
  { label: 'Eritrea', value: 'ERI' },
  { label: 'Estonia', value: 'EST' },
  { label: 'Ethiopia', value: 'ETH' },
  { label: 'Falkland Islands', value: 'FLK' },
  { label: 'Faroe Islands', value: 'FRO' },
  { label: 'Federated States of Micronesia', value: 'FSM' },
  { label: 'Fiji', value: 'FJI' },
  { label: 'Finland', value: 'FIN' },
  { label: 'France', value: 'FRA' },
  { label: 'French Guiana', value: 'GUF' },
  { label: 'French Polynesia', value: 'PYF' },
  { label: 'Gabon', value: 'GAB' },
  { label: 'Georgia', value: 'GEO' },
  { label: 'Germany', value: 'DEU' },
  { label: 'Ghana', value: 'GHA' },
  { label: 'Gibraltar', value: 'GIB' },
  { label: 'Greece', value: 'GRC' },
  { label: 'Greenland', value: 'GRL' },
  { label: 'Grenada', value: 'GRD' },
  { label: 'Guadeloupe', value: 'GLP' },
  { label: 'Guam', value: 'GUM' },
  { label: 'Guatemala', value: 'GTM' },
  { label: 'Guinea', value: 'GIN' },
  { label: 'Guinea-Bissau', value: 'GNB' },
  { label: 'Guyana', value: 'GUY' },
  { label: 'Haiti', value: 'HTI' },
  { label: 'Honduras', value: 'HND' },
  { label: 'Hong Kong', value: 'HKG' },
  { label: 'Hungary', value: 'HUN' },
  { label: 'Iceland', value: 'ISL' },
  { label: 'India', value: 'IND' },
  { label: 'Indonesia', value: 'IDN' },
  { label: 'Iran', value: 'IRN' },
  { label: 'Iraq', value: 'IRQ' },
  { label: 'Ireland', value: 'IRL' },
  { label: 'Israel', value: 'ISR' },
  { label: 'Italy', value: 'ITA' },
  { label: 'Jamaica', value: 'JAM' },
  { label: 'Japan', value: 'JPN' },
  { label: 'Jordan', value: 'JOR' },
  { label: 'Kazakhstan', value: 'KAZ' },
  { label: 'Kenya', value: 'KEN' },
  { label: 'Kiribati', value: 'KIR' },
  { label: 'Kuwait', value: 'KWT' },
  { label: 'Kyrgyzstan', value: 'KGZ' },
  { label: 'Laos', value: 'LAO' },
  { label: 'Latvia', value: 'LVA' },
  { label: 'Lebanon', value: 'LBN' },
  { label: 'Lesotho', value: 'LSO' },
  { label: 'Liberia', value: 'LBR' },
  { label: 'Libya', value: 'LBY' },
  { label: 'Liechtenstein', value: 'LIE' },
  { label: 'Lithuania', value: 'LTU' },
  { label: 'Luxembourg', value: 'LUX' },
  { label: 'Macao', value: 'MAC' },
  { label: 'Macedonia', value: 'MKD' },
  { label: 'Madagascar', value: 'MDG' },
  { label: 'Malawi', value: 'MWI' },
  { label: 'Malaysia', value: 'MYS' },
  { label: 'Maldives', value: 'MDV' },
  { label: 'Mali', value: 'MLI' },
  { label: 'Malta', value: 'MLT' },
  { label: 'Marshall Islands', value: 'MHL' },
  { label: 'Martinique', value: 'MTQ' },
  { label: 'Mauritania', value: 'MRT' },
  { label: 'Mauritius', value: 'MUS' },
  { label: 'Mayotte', value: 'MYT' },
  { label: 'Mexico', value: 'MEX' },
  { label: 'Moldova', value: 'MDA' },
  { label: 'Monaco', value: 'MCO' },
  { label: 'Mongolia', value: 'MNG' },
  { label: 'Montenegro', value: 'MNE' },
  { label: 'Montserrat', value: 'MSR' },
  { label: 'Morocco', value: 'MAR' },
  { label: 'Mozambique', value: 'MOZ' },
  { label: 'Namibia', value: 'NAM' },
  { label: 'Nauru', value: 'NRU' },
  { label: 'Nepal', value: 'NPL' },
  { label: 'Netherlands', value: 'NLD' },
  { label: 'Netherlands Antilles', value: 'ANT' },
  { label: 'New Caledonia', value: 'NCL' },
  { label: 'New Zealand', value: 'NZL' },
  { label: 'Nicaragua', value: 'NIC' },
  { label: 'Niger', value: 'NER' },
  { label: 'Nigeria', value: 'NGA' },
  { label: 'Niue', value: 'NIU' },
  { label: 'Norfolk Island', value: 'NFK' },
  { label: 'North Korea', value: 'PRK' },
  { label: 'Northern Mariana Islands', value: 'MNP' },
  { label: 'Norway', value: 'NOR' },
  { label: 'Oman', value: 'OMN' },
  { label: 'Pakistan', value: 'PAK' },
  { label: 'Palau', value: 'PLW' },
  { label: 'Palestine', value: 'PSE' },
  { label: 'Panama', value: 'PAN' },
  { label: 'Papua New Guinea', value: 'PNG' },
  { label: 'Paraguay', value: 'PRY' },
  { label: 'Peru', value: 'PER' },
  { label: 'Philippines', value: 'PHL' },
  { label: 'Poland', value: 'POL' },
  { label: 'Portugal', value: 'PRT' },
  { label: 'Puerto Rico', value: 'PRI' },
  { label: 'Qatar', value: 'QAT' },
  { label: 'Congo', value: 'COG' },
  { label: 'Réunion', value: 'REU' },
  { label: 'Romania', value: 'ROU' },
  { label: 'Russia', value: 'RUS' },
  { label: 'Rwanda', value: 'RWA' },
  { label: 'Saint Barthélemy', value: 'BLM' },
  { label: 'Saint Helena', value: 'SHN' },
  { label: 'Saint Kitts and Nevis', value: 'KNA' },
  { label: 'Saint Martin', value: 'MAF' },
  { label: 'Saint Pierre and Miquelon', value: 'SPM' },
  { label: 'Saint Vincent and the Grenadines', value: 'VCT' },
  { label: 'Samoa', value: 'WSM' },
  { label: 'San Marino', value: 'SMR' },
  { label: 'São Tomé and Príncipe', value: 'STP' },
  { label: 'Saudi Arabia', value: 'SAU' },
  { label: 'Senegal', value: 'SEN' },
  { label: 'Serbia', value: 'SRB' },
  { label: 'Seychelles', value: 'SYC' },
  { label: 'Sierra Leone', value: 'SLE' },
  { label: 'Singapore', value: 'SGP' },
  { label: 'Sint Maarten (Dutch part)', value: 'SXM' },
  { label: 'Slovakia', value: 'SVK' },
  { label: 'Slovenia', value: 'SVN' },
  { label: 'Solomon Islands', value: 'SLB' },
  { label: 'Somalia', value: 'SOM' },
  { label: 'South Africa', value: 'ZAF' },
  { label: 'South Korea', value: 'KOR' },
  { label: 'South Sudan', value: 'SSD' },
  { label: 'Spain', value: 'ESP' },
  { label: 'Sri Lanka', value: 'LKA' },
  { label: 'Saint Lucia', value: 'LCA' },
  { label: 'Sudan', value: 'SDN' },
  { label: 'Suriname', value: 'SUR' },
  { label: 'Swaziland', value: 'SWZ' },
  { label: 'Sweden', value: 'SWE' },
  { label: 'Switzerland', value: 'CHE' },
  { label: 'Syrian Arab Republic', value: 'SYR' },
  { label: 'Taiwan', value: 'TWN' },
  { label: 'Tajikistan', value: 'TJK' },
  { label: 'Tanzania', value: 'TZA' },
  { label: 'Thailand', value: 'THA' },
  { label: 'Bahamas', value: 'BHS' },
  { label: 'Gambia', value: 'GMB' },
  { label: 'Timor-Leste', value: 'TLS' },
  { label: 'Togo', value: 'TGO' },
  { label: 'Tokelau', value: 'TKL' },
  { label: 'Tonga', value: 'TON' },
  { label: 'Trinidad and Tobago', value: 'TTO' },
  { label: 'Tunisia', value: 'TUN' },
  { label: 'Turkey', value: 'TUR' },
  { label: 'Turkmenistan', value: 'TKM' },
  { label: 'Turks and Caicos Islands', value: 'TCA' },
  { label: 'Tuvalu', value: 'TUV' },
  { label: 'Uganda', value: 'UGA' },
  { label: 'Ukraine', value: 'UKR' },
  { label: 'United Arab Emirates', value: 'ARE' },
  { label: 'United Kingdom', value: 'GBR' },
  { label: 'United States', value: 'USA' },
  { label: 'Uruguay', value: 'URY' },
  { label: 'U.S. Virgin Islands', value: 'VIR' },
  { label: 'Uzbekistan', value: 'UZB' },
  { label: 'Vanuatu', value: 'VUT' },
  { label: 'Vatican City', value: 'VAT' },
  { label: 'Venezuela', value: 'VEN' },
  { label: 'Vietnam', value: 'VNM' },
  { label: 'Wallis and Futuna', value: 'WLF' },
  { label: 'Yemen', value: 'YEM' },
  { label: 'Zambia', value: 'ZMB' },
  { label: 'Zimbabwe', value: 'ZWE' },
]

export const typeOptions = [
  { value: 'ID', label: 'ID CARD' },
  { value: 'P', label: 'PASSPORT' },
]
