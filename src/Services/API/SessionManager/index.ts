import { SesssionManagerModel } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { Http } from '@Services'

export const ServiceSessionManager = {
  getSessions: async (params: SesssionManagerModel.GetSessions.Params) => {
    let response = await Http.Post<SesssionManagerModel.GetSessions.Response>(APIConsts.Http, {
      method: APIConsts.SessionManager.GetSessions,
      params,
    })
    return response
  },
  getPesenceInfo: async (params: SesssionManagerModel.GetPesenceInfo.Params) => {
    let response = await Http.Post<SesssionManagerModel.GetPesenceInfo.Response>(APIConsts.Http, {
      method: APIConsts.SessionManager.GetPesenceInfo,
      params,
    })
    return response
  },
  sessionRemove: async (params: SesssionManagerModel.SessionRemove.Params) => {
    let response = await Http.Post<SesssionManagerModel.SessionRemove.Response>(APIConsts.Http, {
      method: APIConsts.SessionManager.SessionRemove,
      params,
    })
    return response
  },
  setSuspendSession: async (params: SesssionManagerModel.SetSuspendSession.Params) => {
    console.log(params)
    let response = await Http.Post<SesssionManagerModel.SetSuspendSession.Response>(APIConsts.Http, {
      method: APIConsts.SessionManager.SetSuspendSession,
      params,
    })
    return response
  },
  setTracing: async (params: SesssionManagerModel.SetTracing.Params) => {
    let response = await Http.Post<SesssionManagerModel.SetTracing.Response>(APIConsts.Http, {
      method: APIConsts.SessionManager.SetTracing,
      params,
    })
    return response
  },
}
