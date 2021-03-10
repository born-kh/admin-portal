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

    interface Response {
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

    interface Response {
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

    interface Response {
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

    interface Response {
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

    interface Response {
      result: {
        message: string
      }
    }
  }
  declare namespace DocumentGetTypesBySetId {
    interface Params {
      setID: string
    }

    interface Response {
      result: {
        types: DocumentTypes
      }
    }
  }
  declare namespace DocumentGetByApplicationId {
    interface Params {
      applicationID: string
    }

    interface Response {
      result: {
        documents: IDocument[]
      }
    }
  }
  declare namespace DocumentDelete {
    interface Params {
      documentID: string
    }

    interface Response {
      result: {
        message: string
      }
    }
  }
  declare namespace CountryGetSets {
    interface Params {
      countryISOCode: string
    }

    interface Response {
      result: {
        sets: IDocumentSet[]
      }
    }
  }
  declare namespace ApplicationGetByAccount {
    interface Params {
      accountID: string
    }

    interface Response {
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

    interface Response {
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
    interface Params {
      name?: Name
      phone?: string
    }

    interface Response {
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

    interface Response {
      result: {
        message: string
      }
    }
  }
  declare namespace ApplicationCheckPassport {
    interface Params {
      passportNumber: string
    }

    interface Response {
      result: { availabe: string }
    }
  }
}

export { DocumentManagerModel }
