import { StatisticsManagerModel } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { Http } from '@Services'

export const ServiceStatisticsManager = {
  resendCode: async (params: StatisticsManagerModel.ResendCode.Params) => {
    let response = await Http.Post<StatisticsManagerModel.ResendCode.Response>(APIConsts.Http, {
      method: APIConsts.StatisticsManager.ResendCode,
      params,
    })
    return response
  },

  getAuthCodeList: async (params: StatisticsManagerModel.GetAuthCodeList.Params) => {
    let response = await Http.Post<StatisticsManagerModel.GetAuthCodeList.Response>(APIConsts.Http, {
      method: APIConsts.StatisticsManager.GetAuthCodeList,
      params,
    })
    return response
  },
  cdrCallGetByAccountId: async (params: StatisticsManagerModel.CDRCallGetByAccountId.Params) => {
    let response = await Http.Post<StatisticsManagerModel.CDRCallGetByAccountId.Response>(APIConsts.Http, {
      method: APIConsts.StatisticsManager.CDRCallGetByAccountId,
      params,
    })
    return response
  },
  cdrCallGet: async (params: StatisticsManagerModel.CDRCallGet.Params) => {
    let response = await Http.Post<StatisticsManagerModel.CDRCallGet.Response>(APIConsts.Http, {
      method: APIConsts.StatisticsManager.CDRCallGet,
      params,
    })
    return response
  },
  cdrCallGetByIds: async (params: StatisticsManagerModel.CDRCallGetByIds.Params) => {
    let response = await Http.Post<StatisticsManagerModel.CDRCallGetByIds.Response>(APIConsts.Http, {
      method: APIConsts.StatisticsManager.CDRCallGetByIds,
      params,
    })
    return response
  },
  cdrGetStars: async (params: StatisticsManagerModel.CDRGetStars.Params) => {
    let response = await Http.Post<StatisticsManagerModel.CDRGetStars.Response>(APIConsts.Http, {
      method: APIConsts.StatisticsManager.CDRGetStars,
      params,
    })
    return response
  },
  getUserLogs: async (params: StatisticsManagerModel.GetUserLogs.Params) => {
    console.log(params)
    let response = await Http.Post<StatisticsManagerModel.GetUserLogs.Response>(APIConsts.Http, {
      method: APIConsts.StatisticsManager.GetUserLogs,
      params,
    })
    return response
  },
}
