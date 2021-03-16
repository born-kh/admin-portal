// #region Interface Imports
import {
  HttpModel,
  IAccount,
  IFields,
  IApplication,
  DocumentStatus,
  ApplicationStatus,
  IDocument,
  DocumentTypes,
} from '@Interfaces'

// #endregion Interface Imports

declare namespace DocumentManagerModel {
  declare namespace DocumentSetTags {
    interface Params {
      documentID: string
      tags: string[]
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
      }
    }
  }
  declare namespace DocumentSetNote {
    interface Params {
      documentID: string
      note: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
      }
    }
  }
  declare namespace DocumentSetFields {
    interface Params {
      documentID: string
      fields: IFields
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
      }
    }
  }
  declare namespace ApplicationGetNew {
    interface Params {
      start: number
      count: number
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        applications: IApplication[]
        totalCount: number
      }
    }
  }
  declare namespace DocumentSetStatus {
    interface Params {
      documentTypeID: string
      documentSetID: string
      user: string
      status: DocumentStatus
      applicationID: string
      reason?: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
      }
    }
  }
  declare namespace DocumentGetTypesBySetId {
    interface Params {
      setID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        types: DocumentTypes
      }
    }
  }
  declare namespace DocumentGetByApplicationId {
    interface Params {
      applicationID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        documents: IDocument[]
      }
    }
  }
  declare namespace DocumentDelete {
    interface Params {
      documentID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
      }
    }
  }
  declare namespace CountryGetSets {
    interface Params {
      countryISOCode: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        sets: IDocumentSet[]
      }
    }
  }
  declare namespace ApplicationGetByAccount {
    interface Params {
      accountID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        applications: IApplication[]
      }
    }
  }
  declare namespace ApplicationGetAny {
    interface Params {
      start: number
      count: number
      filter: any
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        applications: IApplication[]
        totalCount: number
      }
    }
  }

  declare namespace ApplicationSearch {
    type Name = {
      firstName: string
      lastName: string
    }
    interface Params extends HttpModel.IRequestResponse {
      name?: Name
      phone?: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        applications: IApplication[]
      }
    }
  }
  declare namespace ApplicationSetStatus {
    interface Params {
      user: string
      applicationID: string
      status: ApplicationStatus
      documentSetID: string
      reason?: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
      }
    }
  }
  declare namespace ApplicationCheckPassport {
    interface Params {
      passportNumber: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: { availabe: string }
    }
  }
}

export { DocumentManagerModel }
