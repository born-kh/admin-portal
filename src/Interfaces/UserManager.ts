export interface IAccount {
  accountID: string
  firstName?: string
  lastName?: string
  username?: string
  avatar?: string
  status: AccountStatus
  phones: IPhoneInfo[]
  emails: IEmailInfo[]
  auth: AuthInfo
  createdAt: Date
  avatarUrl?: string
}

export interface IAccountSessionsData {
  meta: IMeta
  isTracing: boolean
  blocklist: string[]
  isSuspended: boolean
  lastActive: Date
  geo?: IGeoLocation
  firebase?: IPush
  ios?: IPush
  iosvoip?: IPush
  isConnected: boolean
  tableData?: any
}

export interface IPhoneInfo {
  number: string
  type: PhoneType
}

export interface IEmailInfo {
  email: string
  type: EmailType
}
export interface AuthInfo {
  hasPassword: boolean
  passwordType?: PasswordType
  status?: AuthStatus
}

export interface IMeta {
  id: number
  accountID: number
  sessionID: string
  registerIP: string
  appVersion: string
  deviceID: string
  lastRemoteIP: string
  platform: Platforms
  deviceName: string
  apiKey?: string
  ip: string
  url?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IPush {
  token: string
  devToken: boolean
  tokenType: PushTokenType
  createdAt: Date
}

export interface IGeoLocation {
  longitude: number
  latitude: number
  date: Date
}
export enum Platforms {
  android = 'android',
  ios = 'ios',
  windows = 'windows',
  macOS = 'macOS',
  linux = 'linux',
  web = 'web',
  bot = 'bot',
  unknown = 'unknown',
  ALL = 'ALL',
}
export enum AccountFilterDateType {
  exact = 'EXACT',
  after = 'AFTER',
  around = 'AROUND',
  before = 'BEFORE',
}

export enum AuthStatus {
  ENABLED = 'ENABLED',
  DISABLED = 'DISABLED',
  DELETED = 'DELETED',
}

export enum PasswordType {
  PLAINTEXT = 'PLAINTEXT',
  MD5 = 'MD5',
  SHA256 = 'SHA256',
  CRYPT = 'CRYPT',
  SALTED_CRYPT = 'SALTED_CRYPT',
}

export enum PhoneType {
  main = 'MAIN',
  ngn = 'NGN',
  mobile = 'MOBILE',
  work = 'WORK',
  home = 'HOME',
  fax = 'FAX',
  other = 'OTHER',
}

export enum EmailType {
  MAIN = 'MAIN',
  HOME = 'HOME',
  WORK = 'WORK',
  OTHER = 'OTHER',
}

export enum SearchType {
  phone = 'phone',
  email = 'email',
  username = 'username',
  accountID = 'accountID',
  firstname = 'firstname',
  lastname = 'lastname',
}

export interface IProfile {
  accountID: string
  firstName?: string
  lastName?: string
  username?: string
  avatar?: string
  status: AccountStatus
  phones: PhoneInfo[]
  emails: EmailInfo[]
  auth: AuthInfo
}

interface PhoneInfo {
  number: string
  type: PhoneType
}

interface EmailInfo {
  email: string
  type: EmailType
}

export enum AccountStatus {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}

export enum PushTokenType {
  ios = 1,
  iosVoip = 2,
  androidFCM = 3,
  web = 4,
}

export interface ItemType {
  name: string
  type?: string
}

export enum FilterType {
  exact = 'EXACT',
  after = 'AFTER',
  around = 'AROUND',
  before = 'BEFORE',
}

export interface IUserLog {
  id: string
  method: string
  account_id: string
  data: string
  ip: string
  ts: string
  tableData?: any
}

export interface IUserSettings {
  autoDelete: AutoDelete
}

export interface AutoDelete {
  enabled: boolean
  days: number
}

export interface IAccountSystemSettings {
  id?: number
  voip?: IWebRTCSettings
  network?: INetwork
  user?: IUserSettings
  description: String
  tableData?: any
}
export interface ISystemSettings {
  id?: number
  voip?: IWebRTCSettings
  network?: INetwork
  description: String
  tableData?: any
}

export interface INetwork {
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

export interface IWebRTCSettings {
  id: number
  iceServers: [IIceServer]
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
export interface IIceServer {
  url: string[]
  username?: string
  credentials?: string
  tlsCERTPolicy?: number
}
