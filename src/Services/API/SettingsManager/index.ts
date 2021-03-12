import { SettingsManagerModel } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { Http } from '@Services'

export const ServiceSettingsManager = {
  callQualityCreate: async (params: SettingsManagerModel.CallQualityCreate.Params) => {
    let response = await Http.Post<SettingsManagerModel.CallQualityCreate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.CallQualityCreate,
      params,
    })
    return response
  },
  callQualityDelete: async (params: SettingsManagerModel.CallQualityDelete.Params) => {
    let response = await Http.Post<SettingsManagerModel.CallQualityDelete.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.CallQualityDelete,
      params,
    })
    return response
  },
  callQualityGetAll: async (params: SettingsManagerModel.CallQualityGetAll.Params) => {
    let response = await Http.Post<SettingsManagerModel.CallQualityGetAll.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.CallQualityGetAll,
      params,
    })
    return response
  },
  callQualityGetById: async (params: SettingsManagerModel.CallQualityGetById.Params) => {
    let response = await Http.Post<SettingsManagerModel.CallQualityGetById.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.CallQualityGetById,
      params,
    })
    return response
  },
  questionDelete: async (params: SettingsManagerModel.QuestionDelete.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionDelete.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionDelete,
      params,
    })
    return response
  },
  questionCreate: async (params: SettingsManagerModel.QuestionCreate.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionCreate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionCreate,
      params,
    })
    return response
  },
  callQualityUpdate: async (params: SettingsManagerModel.CallQualityUpdate.Params) => {
    let response = await Http.Post<SettingsManagerModel.CallQualityUpdate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.CallQualityUpdate,
      params,
    })
    return response
  },
  questionGetAll: async (params: SettingsManagerModel.QuestionGetAll.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionGetAll.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionGetAll,
      params,
    })
    return response
  },
  questionGetById: async (params: SettingsManagerModel.QuestionGetById.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionGetById.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionGetById,
      params,
    })
    return response
  },
  questionLangCreate: async (params: SettingsManagerModel.QuestionLangCreate.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionLangCreate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionLangCreate,
      params,
    })
    return response
  },
  questionLangDelete: async (params: SettingsManagerModel.QuestionLangDelete.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionLangDelete.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionLangDelete,
      params,
    })
    return response
  },
  questionUpdate: async (params: SettingsManagerModel.QuestionUpdate.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionUpdate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionUpdate,
      params,
    })
    return response
  },
  questionLangUpdate: async (params: SettingsManagerModel.QuestionLangUpdate.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionLangUpdate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionLangUpdate,
      params,
    })
    return response
  },
  questionLangGetByQuestionId: async (params: SettingsManagerModel.QuestionLangGetByQuestionId.Params) => {
    let response = await Http.Post<SettingsManagerModel.QuestionLangGetByQuestionId.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.QuestionLangGetByQuestionId,
      params,
    })
    return response
  },
  authSettingsGetAll: async (params: SettingsManagerModel.AuthSettingsGetAll.Params) => {
    let response = await Http.Post<SettingsManagerModel.AuthSettingsGetAll.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.SettingsGetAll,
      params,
    })
    return response
  },
  authSettingsGet: async (params: SettingsManagerModel.AuthSettingsGet.Params) => {
    let response = await Http.Post<SettingsManagerModel.AuthSettingsGet.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.SettingsGet,
      params,
    })
    return response
  },
  authSettingsDelete: async (params: SettingsManagerModel.AuthSettingsDelete.Params) => {
    let response = await Http.Post<SettingsManagerModel.AuthSettingsDelete.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.SettingsDelete,
      params,
    })
    return response
  },
  authSettingsCreate: async (params: SettingsManagerModel.AuthSettingsCreate.Params) => {
    let response = await Http.Post<SettingsManagerModel.AuthSettingsCreate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.SettingsCreate,
      params,
    })
    return response
  },
  systemSetSettings: async (params: SettingsManagerModel.SystemSetSettings.Params) => {
    let response = await Http.Post<SettingsManagerModel.SystemSetSettings.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.SystemSetSettings,
      params,
    })
    return response
  },
  systemGetSettings: async (params: SettingsManagerModel.SystemGetSettings.Params) => {
    let response = await Http.Post<SettingsManagerModel.SystemGetSettings.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.SystemGetSettings,
      params,
    })
    return response
  },
  authSettingsUpdate: async (params: SettingsManagerModel.AuthSettingsUpdate.Params) => {
    let response = await Http.Post<SettingsManagerModel.AuthSettingsUpdate.Response>(APIConsts.Http, {
      method: APIConsts.SettingsManager.SettingsUpdate,
      params,
    })
    return response
  },
}
