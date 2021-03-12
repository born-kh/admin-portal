import { Platforms, IGeoLocation } from './UserManager'

export interface IAuthCode {
  id: string // Not
  identifier: string // Show
  type: IdentifierType // Show
  ip: string // Show
  platform: Platforms // Show
  appVersion: string // Show
  deliveryType: DeliveryType // Show
  createdAt: Date // Show
  updatedAt: Date // Not
  activated: boolean // Show
  tableData?: any
}

export enum DeliveryType {
  notSend = 'notSend',
  message = 'message',
  sms = 'sms',
  call = 'call',
  email = 'email',
}

export enum IdentifierType {
  phoneNumber = 'phoneNumber',
  email = 'email',
}

export interface ICall {
  id?: string
  type?: CallType
  channelId?: string
  callState?: CallState
  messageId?: string
  connectedAt?: Date
  SID: string
  participantId: string
  participantState?: EndpointState[]
  direction?: CallDirection[]
  accountID?: string
  sessionId?: string
  originationNumber?: string
  destinationNumber?: string
  role?: Role[]
  audio: Audio[]
  video: Video[]
  screen: Screen[]
  geo: IGeoLocation
  lastActives: Date[]
  tableData: any
}

export enum CallType {
  ALL = 'ALL',
  conference = 'conference',
  peer2peer = 'peer2peer',
  peer2PSDN = 'peer2PSDN',
  PSDN2peer = 'PSDN2peer',
}
export enum CallState {
  active = 'active',
  ended = 'ended',
  all = 'all',
}

export enum EndpointState {
  ALL = 'ALL',
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

export interface IFilterCDR {
  originationNumber?: IFiltertTextCDR
  destinationNumber?: IFiltertTextCDR
  callID?: IFiltertTextCDR
  callType?: CallType
  callState?: CallState
  endpointState?: EndpointState
  range?: IFilterDateRangeCDR
}

export interface IFilterDateRangeCDR {
  from: string
  to: string
}
export interface IFiltertTextCDR {
  text: string
  type: FilterTextTypeCDR
  filterType: FilterTypeCDR
}

export enum FilterTypeCDR {
  and = 'and',
  or = 'or',
}

export enum FilterTextTypeCDR {
  EXACT = 'EXACT',
  BEGINS_WITH = 'BEGINS_WITH',
  CONTAINS = 'CONTAINS',
  ENDS_WITH = 'ENDS_WITH',
}
