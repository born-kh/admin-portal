// #region Interface Imports
import { HttpModel, IAccountSessionsData } from '@Interfaces'

// #endregion Interface Imports

declare namespace SesssionManagerModel {
  declare namespace GetSessions {
    interface Params {
      accountID
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        sessions: IAccountSessionsData[]
      }
    }
  }
  declare namespace GetPesenceInfo {
    interface Params {
      accountID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace SessionRemove {
    interface Params {
      sessionID: string
      accountID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace SetTracing {
    interface Params {
      accountID: string
      sessionID: string
      isTracing: boolean
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace SetSuspendSession {
    interface Params {
      accountID: string
      sessionID: string
      isSuspended: boolean
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
}

export { SesssionManagerModel }
