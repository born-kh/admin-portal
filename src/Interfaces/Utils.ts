export interface CodeCountry {
  code: string
  iso: string
  ru: string
  en: string
}

export enum UserNameType {
  USERNAME = 'USERNAME',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export enum LoadingType {
  FETCH_SESSIONS = 'FETCH_SESSIONS',
  CREATE_SESSION = 'CREATE_SESSION',
  FETCH_BUSINESS_ACCOUNT = 'FETCH_BUSINESS_ACCOUNT',
  CREATE_BUSINESS_ACCOUNT = 'CREATE_BUSINESS_ACCOUNT',
  FETCH_MESSAGES = 'FETCH_MESSAGES',
}
