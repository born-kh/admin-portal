// #region Interface Imports
import { HttpModel, IAuthSettings, ISystemSettings, ICallQuality, IQuestion, IQuestionLanguage } from '@Interfaces'

// #endregion Interface Imports

declare namespace SettingsManagerModel {
  declare namespace AuthSettingsCreate {
    interface Params extends IAuthSettings {}

    interface Response extends HttpModel.IRequestResponse {
      result: { settings: IAuthSettings }
    }
  }
  declare namespace AuthSettingsDelete {
    interface Params {
      id: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace AuthSettingsUpdate {
    interface Params extends IAuthSettings {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        settings: IAuthSettings
      }
    }
  }
  declare namespace AuthSettingsGetAll {
    interface Params {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        allSettings: IAuthSettings[]
      }
    }
  }
  declare namespace AuthSettingsGet {
    interface Params {
      id: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: { settings: IAuthSettings[] }
    }
  }
  declare namespace SystemGetSettings {
    interface Params {}

    interface Response extends HttpModel.IRequestResponse {
      result: { settings: ISystemSettings[] }
    }
  }
  declare namespace SystemSetSettings {
    interface Params extends ISystemSettings {}

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace CallQualityCreate {
    interface Params extends ICallQuality {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        callQuality: ICallQuality
      }
    }
  }
  declare namespace CallQualityUpdate {
    interface Params extends ICallQuality {}

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace CallQualityDelete {
    interface Params {
      id: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }

  declare namespace CallQualityGetById {
    interface Params {
      id: string[]
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        callQualities: ICallQuality[]
      }
    }
  }
  declare namespace CallQualityGetAll {
    interface Params {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        callQualities: ICallQuality[]
      }
    }
  }

  declare namespace QuestionCreate {
    interface Params extends IQuestion {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        question: IQuestion
      }
    }
  }
  declare namespace QuestionDelete {
    interface Params {
      id: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace QuestionGetAll {
    interface Params {}

    interface Response extends HttpModel.IRequestResponse {
      result: { questions: IQuestion[] }
    }
  }
  declare namespace QuestionGetById {
    interface Params {
      ids: string[]
    }

    interface Response extends HttpModel.IRequestResponse {
      result: { questions: IQuestion[] }
    }
  }
  declare namespace QuestionUpdate {
    interface Params extends IQuestion {}

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace QuestionLangCreate {
    interface Params extends IQuestionLanguage {}

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace QuestionLangDelete {
    interface Params {}

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace QuestionLangGetByQuestionId {
    interface Params {
      questionId
    }

    interface Response extends HttpModel.IRequestResponse {
      result: IQuestionLanguage[]
    }
  }
  declare namespace QuestionLangUpdate {
    interface Params extends IQuestionLanguage {}

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
}

export { SettingsManagerModel }
