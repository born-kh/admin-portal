// #region Interface Imports
import { HttpModel, ICountStarts, IUserLog } from '@Interfaces'
import { IFilterCDR, IAuthCode, ICall } from '@Interfaces/StatisticsManager'

// #endregion Interface Imports

declare namespace StatisticsManagerModel {
  declare namespace CDRCallGet {
    interface Params {
      filter: IFilterCDR
      page: number
      limit: number
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        items: ICall[]
        metadata: {
          page: number
          per: number
          total: number
        }
      }
    }
  }

  declare namespace CDRCallGetByAccountId {
    interface Params {
      accountId: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        calls: ICall[]
      }
    }
  }

  declare namespace CDRCallGetByIds {
    interface Params {
      ids: string[]
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        calls: ICall
      }
    }
  }

  declare namespace CDRGetStars {
    interface Params {
      from: number
      to: number
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        counts: ICountStarts
      }
    }
  }
  declare namespace GetAuthCodeList {
    interface Params {
      identifier?: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: { authCodes: IAuthCode[] }
    }
  }
  declare namespace ResendCode {
    interface Params {
      lang: string
      phoneNumber: string
      codeId: string
      sms: boolean
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }

  declare namespace GetUserLogs {
    interface Params {
      search: string
      fromTS?: number
      toTS?: number
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        userLogs: IUserLog[]
      }
    }
  }
}

export { StatisticsManagerModel }
