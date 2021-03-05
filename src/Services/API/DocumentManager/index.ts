import { DocumentManagerModel } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { Http } from '@Services'

export const ServiceDocumentManager = {
  applicationGetAny: async (params: DocumentManagerModel.ApplicationGetAny.Params) => {
    let response = await Http.Post<DocumentManagerModel.ApplicationGetAny.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.ApplicationGetAny,
      params,
    })
    return response
  },

  applicationGetNew: async (params: DocumentManagerModel.ApplicationGetNew.Params) => {
    let response = await Http.Post<DocumentManagerModel.ApplicationGetNew.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.ApplicationGetNew,
      params,
    })
    return response
  },

  applicationSearch: async (params: DocumentManagerModel.ApplicationSearch.Params) => {
    let response = await Http.Post<DocumentManagerModel.ApplicationSearch.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.ApplicationSearch,
      params,
    })
    return response
  },
  appplicationGetByAccount: async (params: DocumentManagerModel.ApplicationGetByAccount.Params) => {
    let response = await Http.Post<DocumentManagerModel.ApplicationGetByAccount.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.ApplicationGetByAccount,
      params,
    })
    return response
  },
  appplicationSetStatus: async (params: DocumentManagerModel.ApplicationSetStatus.Params) => {
    let response = await Http.Post<DocumentManagerModel.ApplicationSetStatus.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.ApplicationSetStatus,
      params,
    })
    return response
  },
  countryGetSets: async (params: DocumentManagerModel.CountryGetSets.Params) => {
    let response = await Http.Post<DocumentManagerModel.CountryGetSets.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.CountryGetSets,
      params,
    })
    return response
  },
  documentDelete: async (params: DocumentManagerModel.DocumentDelete.Params) => {
    let response = await Http.Post<DocumentManagerModel.DocumentDelete.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.DocumentDelete,
      params,
    })
    return response
  },
  documentGetTypesBySetId: async (params: DocumentManagerModel.DocumentGetTypesBySetId.Params) => {
    let response = await Http.Post<DocumentManagerModel.DocumentGetTypesBySetId.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.DocumentGetTypesBySetId,
      params,
    })
    return response
  },
  documentGetByApplicationId: async (params: DocumentManagerModel.DocumentGetByApplicationId.Params) => {
    let response = await Http.Post<DocumentManagerModel.DocumentGetByApplicationId.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.DocumentGetByApplicationId,
      params,
    })
    return response
  },
  documentSetNote: async (params: DocumentManagerModel.DocumentSetNote.Params) => {
    let response = await Http.Post<DocumentManagerModel.DocumentSetNote.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.DocumentSetNote,
      params,
    })
    return response
  },
  documentSetFields: async (params: DocumentManagerModel.DocumentSetFields.Params) => {
    let response = await Http.Post<DocumentManagerModel.DocumentSetFields.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.DocumentSetFields,
      params,
    })
    return response
  },
  documentSetStatus: async (params: DocumentManagerModel.DocumentSetStatus.Params) => {
    let response = await Http.Post<DocumentManagerModel.DocumentSetStatus.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.DocumentSetStatus,
      params,
    })
    return response
  },
  documentSetTags: async (params: DocumentManagerModel.DocumentSetTags.Params) => {
    let response = await Http.Post<DocumentManagerModel.DocumentSetTags.Response>(APIConsts.Http, {
      method: APIConsts.DocumentManager.DocumentSetTags,
      params,
    })
    return response
  },
}
