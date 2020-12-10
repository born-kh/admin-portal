import {
  DocumentActionsTypes,
  FETCH_ANY_APPLICATIONS,
  FETCH_NEW_APPLICATIONS,
  DELETE_ANY_APPLICATION_BY_ID,
  DELETE_NEW_APPLICATION_BY_ID,
  CHANGE_PAGE_NEW_APPLICATION,
} from './types'
import { FetchApplicationsResponse, ApplicationState } from '@interfaces/document-manager'

const initialState = {
  anyApplication: {
    applications: [],
    totalCount: 0,
  } as FetchApplicationsResponse,
  newApplication: {
    applications: [],
    totalCount: 0,
    page: 0,
    pageSize: 5,
  } as ApplicationState,
}

export default (
  state = initialState,
  action: DocumentActionsTypes
): { anyApplication: FetchApplicationsResponse; newApplication: ApplicationState } => {
  switch (action.type) {
    case FETCH_ANY_APPLICATIONS:
      return { ...state, anyApplication: action.payload }
    case FETCH_NEW_APPLICATIONS:
      return { ...state, newApplication: { ...state.newApplication, ...action.payload } }
    case DELETE_ANY_APPLICATION_BY_ID:
      const anyApplications = state.anyApplication.applications.filter((item) => item.applicationID !== action.payload)
      return { ...state, anyApplication: { ...state.anyApplication, applications: anyApplications } }
    case DELETE_NEW_APPLICATION_BY_ID:
      const newApplications = state.newApplication.applications.filter((item) => item.applicationID !== action.payload)
      return { ...state, newApplication: { ...state.newApplication, applications: newApplications } }
    case CHANGE_PAGE_NEW_APPLICATION:
      return { ...state, newApplication: { ...state.newApplication, ...action.payload } }

    default:
      return state
  }
}
