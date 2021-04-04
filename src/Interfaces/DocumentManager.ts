import { StepIconProps } from '@material-ui/core'
import { IGeoLocation } from './UserManager'

export interface IApplication {
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
  tableData?: any
}

export interface IDocument {
  ID: string
  documenSet: IDocumentSet
  fileInfo: IFileInfo
  documentType: IDocumentType
  status: DocumentStatus
  recognized?: IMachine
  fields?: IFields
  archiveData: string
  tags?: string[]
  note?: string
  reviewManagerID?: string
  fieldsUUID?: string
  geo: IGeoLocation
  tableData: any
}

export interface IDocumentSet {
  ID: string
  setName: string
}

// export interface IDocumentSet {
//   ID: string
//   ts: string
//   name: string
//   note?: string
//   projectID?: string
// }

export interface IDocumentType {
  ID: string
  typeName: string
  typeNote?: string
}

export interface IFileInfo {
  size: number
  originalName: string
  uploadIP: string
}

export interface IFields {
  passport?: IPassport
}

export interface IMachine {
  mrz?: IMachineReadbleZone
}

export interface IPassport {
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

export interface IMachineReadbleZone {
  passport?: IMRZTD3
  idcard?: IMRZTD1
}

export interface IMRZTD3 {
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

export interface IMRZTD1 {
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

export interface IStepType {
  name: string
  status: DocumentStatus
  component: React.ReactElement
  icon: React.ReactElement
  typeID?: string
}

export interface IDocumentTypes {
  ID: string
  name: string
  note?: string
  //  pageFields?: Array<string:string>
  mlProfile?: string
  projectID?: string
  documents: IDocument[]
  status: DocumentStatus
}

export interface IPositionMap {
  latitude: number
  longitude: number
}

export interface IFilterDateRange {
  type: string
  from: string
  to: string
}

export interface IFilterAnyApplication {
  status?: string
  range?: IFilterDateRange
}
export interface IFilterApplicationParams {
  filter?: IFilterAnyApplication
  start: number
  count: number
}

export interface IEditStepProps {
  documents: IDocument[]
  fields: IFields
  handleOnChange: (e: React.ChangeEvent<any>) => void
  handleSumbit: () => void
  blocking: boolean
}

export interface ISelfieStepProps {
  document: IDocumentTypes
  passportDocuments: IDocument[]
  handleDeleteDocument: (ID: string) => void
  handleSetMapPosition: (position: number[]) => void
}

export interface IPassportStepProps {
  document: IDocumentTypes
  handleDeleteDocument: (ID: string) => void
  handleSetMapPosition: (position: number[]) => void
}

export interface IConfirmStepProps {
  documents: IDocument[]
  fields: IFields
}

export interface IMultiStepProps {
  steps: IStepType[]
  handleRejectApplication: () => void
  handleRejectDocument: (value: string) => void
  handleSetActiveStep: (val: number) => void
  handleNext: () => void
  handleBack: () => void
  activeStep: number
  blocking: boolean
  handleApproveDocument: (status: DocumentStatus, typeID: string) => void
  handleApproveApplication: (status: ApplicationStatus) => void
  handleDoneDocumentProcedure: () => void
  handleCheckPassportNumber: () => void
}

export interface IColorlibStepIconProps {
  propsIcon: StepIconProps
  step: IStepType
  activeStep: number
  count: number
}

export interface IApplicationTableProps {
  data?: IApplicationState
  isLoading: boolean
  applications?: IApplication[]
  type: string
  title?: string
  handleChangePage?: (value: number) => void
  handleChangePageSize?: (value: number) => void
}

export interface IDocumentProcedureProps {
  documents: IDocument[]
  documentSetID: string
  applicationID: string

  handleDeleteDocument: (ID: string) => void
  handleUpdateDocument: (typeID: string, documentSetID: string, status: DocumentStatus) => void
  handleDoneDocumentProcedure: () => void
  handleNextApplication: () => void
}

export interface ISetGroupsProps {
  documents: IDocument[]
  isLoading: boolean
  handleSetID: (value: string) => void
}

export interface IApplicationState {
  page: number
  pageSize: number
  applications: IApplication[]
  totalCount: number
}
