import { Platforms } from './apiKey-manager'
import { GeoLocation } from './user-manager'

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

export interface FetchAuthCodesResponse {
  authCodes: IAuthCode[]
}

export interface ResendCodeParams {
  lang: string
  phoneNumber: string
  codeId: string
  sms: boolean
}

export interface GetCDRCallResponse {
  calls: Call[]
}

export interface Call {
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
  geo: GeoLocation
  lastActives: Date[]
  tableData: any
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
