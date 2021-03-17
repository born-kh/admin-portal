import { Language } from './Utils'

export interface IAuthSettings {
  id?: string
  prefix: string
  permissionType: PermissionTypeAuthSettings
  description?: string
}

export enum PermissionTypeAuthSettings {
  allow = 'allow',
  deny = 'deny',
}

export interface ICallQuality {
  id?: string
  ask: boolean
  askDuration: number
  askIf: { [key: string]: string }
  questions: { [key: string]: string[] }
}

export interface ICountStarts {
  [key: number]: number
}

export interface IQuestion {
  id?: string
  type?: QuestionType
  maxLen?: number
  bgText?: string
  def?: boolean
}

export interface IQuestionLanguage {
  id?: string
  question?: IQuestion
  questionId?: string
  text: String
  lang: Language
}

export enum QuestionType {
  checkbox = 'checkbox',
  inputline = 'inputline',
}
export interface IPermissions {
  [key: string]: string[]
}
