// #region Interface Imports
import { ApodPayload, ApodResponse, HttpModel, ICountStarts } from '@Interfaces'
import { IFilterCDR, IAuthCode, ICall } from '@Interfaces/StatisticsManager'

// #endregion Interface Imports

declare namespace StatisticsManagerModel {
  declare namespace CDRCallGet {
    interface Params {
      filter: IFilterCDR
      page: number
      limit: number
    }

    interface Response {
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

    interface Response {
      result: {
        calls: ICall[]
      }
    }
  }

  declare namespace CDRCallGetByIds {
    interface Params {
      ids: string[]
    }

    interface Response {
      result: {
        calls: ICall
      }
    }
  }

  declare namespace CDRGetStars {
    interface Params {
      from: string
      to: string
    }

    interface Response {
      result: {
        counts: ICountStarts
      }
    }
  }
  declare namespace GetAuthCodeList {
    interface Params {
      identifier?: string
    }

    interface Response {
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

    interface Response {
      result: {}
    }
  }
}

export { StatisticsManagerModel }
