// #region Interface Imports
import {
  ApodPayload,
  ApodResponse,
  HttpModel,
  IAccountSessionsData,
  IApiKey,
  IApiKeyCreateParams,
  IApiKeyUpdateParams,
} from '@Interfaces'

declare namespace ApiKeyManagerModel {
  declare namespace ApiKeyCreate {
    interface Params extends IApiKeyCreateParams {}

    interface Response {
      result: {
        apiKey: IApiKey
        message: string
      }
    }
  }
  declare namespace ApiKeyGet {
    interface Params {}

    interface Response {
      result: {
        apiKeys: IApiKey[]
      }
    }
  }
  declare namespace ApiKeyUpdate {
    interface Params extends IApiKeyUpdateParams {}

    interface Response {
      result: {
        apiKey: IApiKey
        message: string
      }
    }
  }
}

export { ApiKeyManagerModel }
