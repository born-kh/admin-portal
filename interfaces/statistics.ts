import { Platforms } from './apiKey-manager'

export interface IAuthCode {
  id: string // Not
  identifier: string // Show
  type: IdentifierType // Show
  ip: string // Show
  platform: Platforms // Show
  appVersion: string // Show
  deviceId: string // Not
  deliveryType: DeliveryType // Show
  timeout: number // Not
  ttl: number // Not
  createdAt: Date // Show
  updatedAt: Date // Not
  activated: boolean // Show
  accountId: string // Not
  sessionId: string // Not
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
