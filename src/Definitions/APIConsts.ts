export const APIConsts = {
  Auth: {
    SendCode: 'endpoint.send.code',
    ValidateCode: 'endpoint.validate.code',
    SignIn: 'endpoint.signin',
    SendCodeSMS: 'endpoint.send.code.sms',
    ResendCode: 'endpoint.resend.code',
    RefreshToken: 'endpoint.refresh.token',
    Logout: 'session.logout',
  },
  UserManager: {
    SearchAccount: 'gateway.system.search.account',
    AccountGetByDate: 'gateway.account.get.dated',
    GetUserPermissions: 'gateway.get.permissions',
    SetPassword: 'gateway.system.set.password',
    GetAccountSettings: 'gateway.system.account.settings.get',
    SetAccountSettings: 'gateway.system.account.settings.set',
    GetProfile: 'account.get.profile',
  },
  ApiKeyManager: {
    ApiKeyCreate: 'gateway.system.apikey.create',
    ApiKeyGet: 'gateway.system.apikey.get',
    ApiKeyUpdate: 'gateway.apikey.update',
  },
  DocumentManager: {
    ApplicationGetByAccount: 'gateway.application.account.get',
    ApplicationGetAny: 'gateway.application.get.any',
    ApplicationSearch: 'gateway.application.search',
    ApplicationSetStatus: 'gateway.application.set.status',
    ApplicationCheckPassport: 'gateway.check.passport',
    CountryGetSets: 'gateway.country.get.sets',
    DocumentDelete: 'gateway.document.delete',
    DocumentGetByApplicationId: 'gateway.document.get',
    DocumentGetTypesBySetId: 'gateway.document.get.types',
    DocumentSetStatus: 'gateway.document.set.status',
    ApplicationGetNew: 'gateway.application.get.new',
    DocumentSetFields: 'gateway.document.set.fields',
    DocumentSetNote: 'gateway.document.set.note',
    DocumentSetTags: 'document.set.tags',
  },
  SessionManager: {
    GetSessions: 'gateway.session.get',
    GetPesenceInfo: 'gateway.get.presence.info',
    SessionRemove: 'gateway.session.remove',
    SetTracing: 'gateway.session.setTracing',
    SetSuspendSession: 'gateway.session.setSuspension',
  },
  SettingsManager: {
    SettingsCreate: 'gateway.settings.create',
    SettingsDelete: 'gateway.settings.delete',
    SettingsUpdate: 'gateway.settings.update',
    SettingsGetAll: 'gateway.settings.get.all',
    SettingsGet: 'gateway.settings.get',
    SystemGetSettings: 'gateway.system.get.settings',
    SystemSetSettings: 'gateway.system.set.settings',
    CallQualityCreate: 'gateway.callquality.create',
    CallQualityUpdate: 'gateway.callquality.update',
    CallQualityDelete: 'gateway.callquality.delete',
    CallQualityGetById: 'gateway.callquality.get.byid',
    CallQualityGetAll: 'gateway.callquality.get.all',

    QuestionCreate: 'gateway.question.create',
    QuestionDelete: 'gateway.question.delete',
    QuestionGetAll: 'gateway.question.get.all',
    QuestionGetById: 'gateway.question.get.byid',
    QuestionUpdate: 'gateway.question.update',
    QuestionLangCreate: 'gateway.question.lang.create',
    QuestionLangDelete: 'gateway.question.lang.delete',
    QuestionLangGetByQuestionId: 'gateway.question.lang.get.byQuestionId',
    QuestionLangUpdate: 'gateway.question.lang.update',
  },
  StatisticsManager: {
    CDRCallGet: 'gateway.call.get',
    CDRCallGetByAccountId: 'gateway.call.get.accountId',
    CDRCallGetByIds: '"gateway.call.get.byids',
    CDRGetStars: 'gateway.quality.data.get.count.stars',
    GetAuthCodeList: 'gateway.auth.code.list',
    ResendCode: 'gateway.internal.resend.code',
    GetUserLogs: 'gateway.user.logs.get',
  },

  Version: 1,
  Http: '/request',
  Request: '/http',
}
