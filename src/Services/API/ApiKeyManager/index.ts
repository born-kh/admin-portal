import { ApiKeyManagerModel } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { Http } from '@Services'

export const ServiceApiKeyManager = {
  apiKeyCreate: async (params: ApiKeyManagerModel.ApiKeyCreate.Params) => {
    let response = await Http.Post<ApiKeyManagerModel.ApiKeyCreate.Response>(APIConsts.Http, {
      method: APIConsts.ApiKeyManager.ApiKeyCreate,
      params,
    })
    return response
  },
  apiKeyUpdate: async (params: ApiKeyManagerModel.ApiKeyUpdate.Params) => {
    let response = await Http.Post<ApiKeyManagerModel.ApiKeyUpdate.Response>(APIConsts.Http, {
      method: APIConsts.ApiKeyManager.ApiKeyUpdate,
      params,
    })
    return response
  },
  apiKeyGet: async (params: ApiKeyManagerModel.ApiKeyGet.Params) => {
    let response = await Http.Post<ApiKeyManagerModel.ApiKeyGet.Response>(APIConsts.Http, {
      method: APIConsts.ApiKeyManager.ApiKeyGet,
      params,
    })
    return response
  },
}
