import { GeoLocation } from './user-manager'
export interface Application {
  ID: string
  applicationID: string
  accountID: string
  status: ApplicationStatus
  firstName?: string
  lastName?: string
  countryName: string
  countryISOCode: string
  createdAt?: Date
  updatedAt?: Date
  submittedAt?: Date
}

export interface Document {
  ID: string
  documenSet: DocumentSet
  fileInfo: FileInfo
  documentType: DocumentType
  status: DocumentStatus
  recognized?: Machine
  fields?: Fields
  archiveData: string
  tags?: string[]
  note?: string
  reviewManagerID?: string
  fieldsUUID?: string
  geo: GeoLocation
}

export interface DocumentSet {
  ID: string
  setName: string
}

export interface DocumentType {
  ID: string
  typeName: string
  typeNote?: string
}

interface FileInfo {
  size: number
  originalName: string
  uploadIP: string
}

export interface Fields {
  passport?: Passport
}

export interface Machine {
  mrz?: MachineReadbleZone
}

export interface Passport {
  type: string
  country: string
  number: string
  date_of_birth: string
  expiration_date: string
  issue_date: string
  nationality: string
  sex: SexType
  first_name: string
  last_name: string
  personal_number: string
  address?: string
  issuingAuth?: string
}

export interface MachineReadbleZone {
  passport?: MRZTD3
  idcard?: MRZTD1
}

export interface MRZTD3 {
  valid_score: number
  type: string
  country: string
  number: string
  date_of_birth: string
  expiration_date: string
  nationality: string
  sex: SexType
  names: string
  surname: string
  personal_number: string
  check_number: string
  check_date_of_birth: string
  check_expiration_date: string
  check_composite: string
  check_personal_number: string
  valid_number: boolean
  valid_date_of_birth: boolean
  valid_expiration_date: boolean
  valid_composite: boolean
  valid_personal_number: boolean
}

export interface MRZTD1 {
  valid_score: number
  type: string
  country: string
  number: string
  national_id: string
  date_of_birth: string
  sex: SexType
  expiration_date: string
  nationality: string
  optional_data?: string
  names: string
  surname: string

  check_number: string
  check_date_of_birth: string
  check_expiration_date: string
  check_composite: string

  valid_number: boolean
  valid_date_of_birth: boolean
  valid_expiration_date: boolean
  valid_composite: boolean
}

export enum ApplicationStatus {
  new = 'NEW',
  approved = 'APPROVED',
  pending = 'PENDING',
  requestMoreDocs = 'REQUEST_MORE_DOCUMENTS',
  rejected = 'REJECTED',
  eligible = 'ELIGIBLE',
}

export enum DocumentStatus {
  new = 'NEW',
  recognized = 'ML_DONE',
  unrecognized = 'ML_FAILED',
  corrected = 'HUMAN_CORRECTED',
  approved = 'HUMAN_APPROVED',
  rejected = 'HUMAN_REJECTED',
  filled = 'HUMAN_FILLED',
  passed = 'HUMAN_CHECK_PASSED',
  failed = 'FAILED',
}

export enum SexType {
  M = 'M',
  F = 'F',
  Unknown = 'Unknown',
}

export interface StepType {
  name: string
  status: DocumentStatus
  component: React.ReactElement
  icon: React.ReactElement
  typeID?: string
}

export interface DocumentTypes {
  ID: string
  name: string
  note?: string
  //  pageFields?: Array<string:string>
  mlProfile?: string
  projectID?: string
  documents: Document[]
  status: DocumentStatus
}

export interface PositionMap {
  latitude: number
  longitude: number
}

export interface FilterDateRange {
  type: string
  from: string
  to: string
}

export interface FilterAnyApplication {
  status?: string
  range?: FilterDateRange
}
export interface FilterApplicationParams {
  filter?: FilterAnyApplication
  start: number
  count: number
}
