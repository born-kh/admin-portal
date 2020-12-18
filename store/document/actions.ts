import { Dispatch } from 'redux'
import { DocumentActionsTypes, FETCH_ANY_APPLICATIONS, FETCH_NEW_APPLICATIONS } from './types'
import { documentAPI } from 'service/api'

export const fetchAnyApplicationsAction = (params: any) => {
  return async (dispatch: Dispatch<DocumentActionsTypes>) => {
    let response = await documentAPI.fetchApplicationsAny(params)
    console.log(response)

    if (response.status == 200) {
      dispatch({ type: FETCH_ANY_APPLICATIONS, payload: { ...response.data } })
    }
  }
}

export const fetchNewApplicationsAction = (params: { start: number; count: number }) => {
  return async (dispatch: Dispatch<DocumentActionsTypes>) => {
    let response = await documentAPI.fetchApplications(params)

    if (response.status == 200) {
      dispatch({ type: FETCH_NEW_APPLICATIONS, payload: { ...response.data } })
    }
  }
}
