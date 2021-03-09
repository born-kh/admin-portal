// #region Interface Imports
import { ApodPayload, ApodResponse, HttpModel, IAccount, IAccountSystemSettings } from '@Interfaces'

// #endregion Interface Imports

declare namespace UserManagerModel {
  declare namespace SearchAccount {
    interface Params {
      type: SearchType
      search: string
    }

    interface Response {
      result: {
        accounts: IAccount[]
      }
    }
  }

  declare namespace AccountGetByDate {
    interface Params {
      ts: string
      type: FilterType
    }
    enum FilterType {
      exact = 'EXACT',
      after = 'AFTER',
      around = 'AROUND',
      before = 'BEFORE',
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        accounts: IAccount[]
      }
    }
  }

  declare namespace SetPassword {
    interface Params {
      accountId: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
        success: boolean
      }
    }
  }

  declare namespace SetAccountSettings {
    interface Params {
      accountID: string
      settings: IAccountSystemSettings
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace GetAccountSettings {
    interface Params {
      accountID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        settings: IAccountSystemSettings
      }
    }
  }
}

export { UserManagerModel }
