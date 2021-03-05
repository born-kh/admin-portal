// #region Interface Imports
import {
  ApodPayload,
  ApodResponse,
  HttpModel,
  SearchTypeParams,
  Account,
  SystemSettings,
  AccountSessionsData,
} from '@Interfaces'

// #endregion Interface Imports

declare namespace SesssionManagerModel {
  declare namespace GetSessions {
    interface Params {
      accountID
    }

    interface Response {
      result: {
        sessions: AccountSessionsData[]
      }
    }
  }
  declare namespace GetPesenceInfo {
    interface Params {
      accountID: string
    }

    interface Response {
      result: {}
    }
  }
  declare namespace SessionRemove {
    interface Params {
      sessionID: string
    }

    interface Response {
      result: {}
    }
  }
  declare namespace SetTracing {
    interface Params {
      sessionID: string
      isTracing: boolean
    }

    interface Response {
      result: {}
    }
  }
  declare namespace SetSuspendSession {
    interface Params {
      sessionID: string
      isSuspended: boolean
    }

    interface Response {
      result: {}
    }
  }
}

export { SesssionManagerModel }
