export interface Account {
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

export interface AccountSessionsData {
  meta: Meta
  isTracing: boolean
  blocklist: string[]
  isSuspended: boolean
  lastActive: Date
  geo?: GeoLocation
  firebase?: Push
  ios?: Push
  iosvoip?: Push
  isConnected: boolean
}

export interface PhoneInfo {
  number: string
  type: PhoneType
}

export interface EmailInfo {
  email: string
  type: EmailType
}
export interface AuthInfo {
  hasPassword: boolean
  passwordType?: PasswordType
  status?: AuthStatus
}

export interface Meta {
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

export interface Push {
  token: string
  devToken: boolean
  tokenType: PushTokenType
  createdAt: Date
}

export interface GeoLocation {
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
export interface SearchTypeParams {
  type: SearchType
  search: string
}

export interface ItemType {
  name: string
  type?: string
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
