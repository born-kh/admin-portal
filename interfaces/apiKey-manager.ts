export interface ApiKey {
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

export interface ApiKeyUpdateParams {
  id: number
  key: string
  scopes?: string[]
  validFrom?: Date
  validTo?: Date
  enabled: boolean
  cacheExpiration: number
}

export interface ApiKeyCreateResponse {
  apiKey: ApiKey
  message: string
}
export interface ApiKeysResponse {
  apiKeys: ApiKey[]
}

export interface ApiKeyCreateParams {
  validFrom: string
  validTo: string
  enabled: boolean
  version: string
  platform: Platforms
}
