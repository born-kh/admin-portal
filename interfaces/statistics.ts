import { Platforms } from './apiKey-manager'

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
