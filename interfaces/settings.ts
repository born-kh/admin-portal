import { Dictionary } from 'lodash'
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
  AskDuration: number
  AskIf: Record<string, string>
  questions: Record<string, Question>
}

export interface Question {
  id?: string
  text?: string
  type?: string
  maxlen?: number
  bgtext?: string
  def?: boolean
}

export interface GetAllCallQualityResponse {
  allCallQuality: CallQuality[]
}

export interface GetAllQuestionsResponse {
  questions: Question[]
}

export interface GetCDRCallResponse {
  calls: Call[]
}

export interface Call {
  id?: string
  callId?: string
  type?: CallType
  channel?: string
  callState: CallState
  participantId: string
  participantState?: EndpointState[]
  direction?: CallDirection[]
  phoneNumber?: string
  accountID?: string
  role?: Role[]
  audio: Audio[]
  video: Video[]
  screen: Screen[]
}

export enum CallType {
  conference = 'conference',
  peer2peer = 'peer2peer',
  peer2PSDN = 'peer2PSDN',
  PSDN2peer = 'PSDN2peer',
}
export enum CallState {
  active = 'active',
  ended = 'ended',
}

export enum EndpointState {
  INITIATED = 'INITIATED',
  CREATED = 'CREATED',
  RINGING = 'RINGING',
  ANSWERED = 'ANSWERED',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ONHOLD = 'ONHOLD',
  ENDED = 'ENDED',
}

export enum CallDirection {
  inbound = 'in',
  outbound = 'out',
}

export enum Role {
  moderator = 'moderator',
  participant = 'participant',
}
export enum Audio {
  inactive = 'inactive',
  onHold = 'onHold',
  active = 'active',
  muted = 'muted',
  talking = 'talking',
}

export enum Video {
  active = 'active',
  inactive = 'inactive',
}
export enum Screen {
  active = 'active',
  inactive = 'inactive',
}
