// #region Interface Imports
import { HttpModel, IAccountSessionsData, IApiKey, IApiKeyCreateParams, IApiKeyUpdateParams } from '@Interfaces'

declare namespace ApiKeyManagerModel {
  declare namespace ApiKeyCreate {
    interface Params extends IApiKeyCreateParams {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        apiKey: IApiKey
        message: string
      }
    }
  }
  declare namespace ApiKeyGet {
    interface Params {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        apiKeys: IApiKey[]
      }
    }
  }
  declare namespace ApiKeyUpdate {
    interface Params extends IApiKeyUpdateParams {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        apiKey: IApiKey
        message: string
      }
    }
  }
}

export { ApiKeyManagerModel }
