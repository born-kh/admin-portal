import { Platforms } from './UserManager'

export interface IApiKey {
  id: number
  apiKey: string
  platform: Platforms
  scopes?: string[]
  createdAt: Date
  deactivatedAt?: Date
  validFrom: Date
  validTo: Date
  enabled: boolean
  version: string
  cacheExpiration: number
  tableData?: any
}

export interface IApiKeyUpdateParams {
  id: number
  key: string
  scopes?: string[]
  validFrom?: Date
  validTo?: Date
  enabled: boolean
  cacheExpiration: number
}

export interface IApiKeyCreateParams {
  validFrom: string
  validTo: string
  enabled: boolean
  version: string
  platform: Platforms
}
