import { UserSettings } from './user-manager'

/* Auth Settings */
export interface AuthSettings {
  id?: string
  prefix: string
  permissionType: PermissionType
  description?: string
}

export interface GetAllAuthSettingsResponse {
  allSettings: AuthSettings[]
}
export interface AuthSettingsResponse {
  settings: AuthSettings
}
export enum PermissionType {
  allow = 'allow',
  deny = 'deny',
}
/* System Settings */
export interface SystemSettings {
  id?: number
  voip?: WebRTCSettings
  network?: Network
  user?: UserSettings
  description: String
  tableData?: any
}
export interface GetSystemSettingsResponse {
  settings: SystemSettings[]
}

export interface Network {
  socketURL: string
  contentServerURL: string
  apiURL: string
  appWebsiteURL?: string
  inCallReconnect: number[]
  generalReconnect: number[]
  supportAccountID?: string
  privacyPolicyURL: string
  baseURL: string
}

export interface WebRTCSettings {
  id: number
  iceServers: [IceServer]
  continualGatheringPolicy: number
  activeResetSrtpParams: boolean
  iceTransportPolicy: number
  bundlePolicy: number
  rtcpMuxPolicy: number
  tcpCandidatePolicy: number
  candidateNetworkPolicy: number
  disableIPV6: boolean
  disableIPV6OnWiFi: boolean
  maxIPv6Networks: number
  disableLinkLocalNetworks: number
  sdpSemantics: number
  rtcpAudioReportIntervalMs: number
  rtcpVideoReportIntervalMs: number
  iceCheckMinInterval?: number
  shouldPruneTurnPorts: boolean
  iceCandidatePoolSize: number
  shouldPresumeWritableWhenFullyRelayed: boolean
  shouldSurfaceIceCandidatesOnIceTransportTypeChanged: boolean
  iceConnectionReceivingTimeout: number
  iceBackupCandidatePairPingInterval: number
}

export interface IceServer {
  url: string[]
  username?: string
  credentials?: string
  tlsCERTPolicy?: number
}

export interface CallQuality {
  id?: string
  ask: boolean
  askDuration: number
  askIf: { [key: string]: string }
  questions: { [key: string]: string[] }
}

export interface CountStarts {
  [key: number]: number[]
}

export interface CallQualityGetStarsResponse {
  counts: CountStarts
}

export interface Question {
  id?: string
  type?: QuestionType
  maxLen?: number
  bgText?: string
  def?: boolean
}

export interface GetAllCallQualityResponse {
  callQualities: CallQuality[]
}

export interface GetAllQuestionsResponse {
  questions: Question[]
}
export interface GetQuestionLanguagesResponse {
  languages: QuestionLanguage[]
}

export interface QuestionLanguage {
  id?: string
  question?: Question
  questionId?: string
  text: String
  lang: Language
}

export enum QuestionType {
  checkbox = 'checkbox',
  inputline = 'inputline',
}

interface Map {
  [key: string]: string | undefined
}

export enum Language {
  Abkhazian = 'ab',
  Afar = 'aa',
  Afrikaans = 'af',
  Akan = 'ak',
  Albanian = 'sq',
  Amharic = 'am',
  Arabic = 'ar',
  Aragonese = 'an',
  Armenian = 'hy',
  Assamese = 'as',
  Avaric = 'av',
  Avestan = 'ae',
  Aymara = 'ay',
  Azerbaijani = 'az',
  Bambara = 'bm',
  Bashkir = 'ba',
  Basque = 'eu',
  Belarusian = 'be',
  Bengali = 'bn',
  Bihari_languages = 'bh',
  Bislama = 'bi',
  Bosnian = 'bs',
  Breton = 'br',
  Bulgarian = 'bg',
  Burmese = 'my',
  Chamorro = 'ch',
  Chechen = 'ce',
  Chichewa = 'ny',
  Nyanja = 'ny',
  Chewa = 'ny',
  Chinese = 'zh',
  Chuvash = 'cv',
  Cornish = 'kw',
  Corsican = 'co',
  Cree = 'cr',
  Croatian = 'hr',
  Czech = 'cs',
  Danish = 'da',
  Divehi = 'dv',
  Maldivian = 'dv',
  Dhivehi = 'dv',
  Dutch = 'nl',
  Flemish = 'nl',
  Dzongkha = 'dz',
  English = 'en',
  Esperanto = 'eo',
  Estonian = 'et',
  Ewe = 'ee',
  Faroese = 'fo',
  Fijian = 'fj',
  Finnish = 'fi',
  French = 'fr',
  Fulah = 'ff',
  Galician = 'gl',
  Georgian = 'ka',
  German = 'de',
  Greek = 'el',
  Modern_Greek = 'el',
  Guarani = 'gn',
  Gujarati = 'gu',
  Haitian = 'ht',
  Haitian_Creole = 'ht',
  Hausa = 'ha',
  Hebrew = 'he',
  Herero = 'hz',
  Hindi = 'hi',
  Hiri_Motu = 'ho',
  Hungarian = 'hu',
  Interlingua = 'ia',
  Indonesian = 'id',
  Interlingue = 'ie',
  Occidental = 'ie',
  Irish = 'ga',
  Igbo = 'ig',
  Inupiaq = 'ik',
  Ido = 'io',
  Icelandic = 'is',
  Italian = 'it',
  Inuktitut = 'iu',
  Japanese = 'ja',
  Javanese = 'jv',
  Kalaallisut = 'kl',
  Greenlandic = 'kl',
  Kannada = 'kn',
  Kanuri = 'kr',
  Kashmiri = 'ks',
  Kazakh = 'kk',
  Central_Khmer = 'km',
  Kikuyu = 'ki',
  Gikuyu = 'ki',
  Kinyarwanda = 'rw',
  Kirghiz = 'ky',
  Kyrgyz = 'ky',
  Komi = 'kv',
  Kongo = 'kg',
  Korean = 'ko',
  Kurdish = 'ku',
  Kuanyama = 'kj',
  Kwanyama = 'kj',
  Latin = 'la',
  Luxembourgish = 'lb',
  Letzeburgesch = 'lb',
  Ganda = 'lg',
  Limburgan = 'li',
  Limburger = 'li',
  Limburgish = 'li',
  Lingala = 'ln',
  Lao = 'lo',
  Lithuanian = 'lt',
  Luba_Katanga = 'lu',
  Latvian = 'lv',
  Manx = 'gv',
  Macedonian = 'mk',
  Malagasy = 'mg',
  Malay = 'ms',
  Malayalam = 'ml',
  Maltese = 'mt',
  Maori = 'mi',
  Marathi = 'mr',
  Marshallese = 'mh',
  Mongolian = 'mn',
  Nauru = 'na',
  Navajo = 'nv',
  Navaho = 'nv',
  North_Ndebele = 'nd',
  Nepali = 'ne',
  Ndonga = 'ng',
  Norwegian_Bokmal = 'nb',
  Norwegian_Nynorsk = 'nn',
  Norwegian = 'no',
  Sichuan_Yi = 'ii',
  Nuosu = 'ii',
  South_Ndebele = 'nr',
  Occitan = 'oc',
  Ojibwa = 'oj',
  Church_Slavic = 'cu',
  Old_Slavonic = 'cu',
  Church_Slavonic = 'cu',
  Old_Bulgarian = 'cu',
  Old_Church_Slavonic = 'cu',
  Oromo = 'om',
  Oriya = 'or',
  Ossetian = 'os',
  Ossetic = 'os',
  Punjabi = 'pa',
  Panjabi = 'pa',
  Pali = 'pi',
  Persian = 'fa',
  Polish = 'pl',
  Pashto = 'ps',
  Pushto = 'ps',
  Portuguese = 'pt',
  Quechua = 'qu',
  Romansh = 'rm',
  Rundi = 'rn',
  Romanian = 'ro',
  Moldavian = 'ro',
  Moldovan = 'ro',
  Russian = 'ru',
  Sanskrit = 'sa',
  Sardinian = 'sc',
  Sindhi = 'sd',
  Northern_Sami = 'se',
  Samoan = 'sm',
  Sango = 'sg',
  Serbian = 'sr',
  Gaelic = 'gd',
  Scottish_Gaelic = 'gd',
  Shona = 'sn',
  Sinhala = 'si',
  Sinhalese = 'si',
  Slovak = 'sk',
  Slovenian = 'sl',
  Somali = 'so',
  Southern_Sotho = 'st',
  Spanish = 'es',
  Castilian = 'es',
  Sundanese = 'su',
  Swahili = 'sw',
  Swati = 'ss',
  Swedish = 'sv',
  Tamil = 'ta',
  Telugu = 'te',
  Tajik = 'tg',
  Thai = 'th',
  Tigrinya = 'ti',
  Tibetan = 'bo',
  Turkmen = 'tk',
  Tagalog = 'tl',
  Tswana = 'tn',
  Tonga = 'to',
  Turkish = 'tr',
  Tsonga = 'ts',
  Tatar = 'tt',
  Twi = 'tw',
  Tahitian = 'ty',
  Uighur = 'ug',
  Uyghur = 'ug',
  Ukrainian = 'uk',
  Urdu = 'ur',
  Uzbek = 'uz',
  Venda = 've',
  Vietnamese = 'vi',
  Volapuk = 'vo',
  Walloon = 'wa',
  Welsh = 'cy',
  Wolof = 'wo',
  Western_Frisian = 'fy',
  Xhosa = 'xh',
  Yiddish = 'yi',
  Yoruba = 'yo',
  Zhuang = 'za',
  Chuang = 'za',
  Zulu = 'zu',
}
