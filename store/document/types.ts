import { FetchApplicationsResponse } from '@interfaces/document-manager'

export const FETCH_NEW_APPLICATIONS = 'FETCH_NEW_APPLICATIONS'
export const FETCH_ANY_APPLICATIONS = 'FETCH_ANY_APPLICATIONS'
export const DELETE_NEW_APPLICATION_BY_ID = 'DELETE_NEW_APPLICATION_BY_ID'
export const DELETE_ANY_APPLICATION_BY_ID = 'DELETE_ANY_APPLICATION_BY_ID'
export const CHANGE_PAGE_NEW_APPLICATION = 'CHANGE_PAGE_NEW_APPLICATION'

interface FetchNewApplicationsAction {
  type: typeof FETCH_NEW_APPLICATIONS
  payload: FetchApplicationsResponse
}

interface FetchAnyApplicationsAction {
  type: typeof FETCH_ANY_APPLICATIONS
  payload: FetchApplicationsResponse
}

interface DeleteNewApplicationByIdAction {
  type: typeof DELETE_NEW_APPLICATION_BY_ID
  payload: string
}

interface DeleteAnypplicationByIdAction {
  type: typeof DELETE_ANY_APPLICATION_BY_ID
  payload: string
}

interface ChangePageNewApplicationAction {
  type: typeof CHANGE_PAGE_NEW_APPLICATION
  payload: { page: number; pageSize: number }
}

export type DocumentActionsTypes =
  | FetchNewApplicationsAction
  | FetchAnyApplicationsAction
  | DeleteNewApplicationByIdAction
  | DeleteAnypplicationByIdAction
  | ChangePageNewApplicationAction
