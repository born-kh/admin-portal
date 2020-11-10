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

export interface SystemSettings {
  id?: number
  voip?: WebRTCSettings
  network?: Network
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
