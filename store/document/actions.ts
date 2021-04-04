import { Dispatch } from 'redux'
import { DocumentActionsTypes, FETCH_ANY_APPLICATIONS, FETCH_NEW_APPLICATIONS } from './types'
import { ServiceDocumentManager } from '@Services'

export const fetchAnyApplicationsAction = (params: any) => {
  return async (dispatch: Dispatch<DocumentActionsTypes>) => {
    let res = await ServiceDocumentManager.applicationGetAny(params)

    if (res.result) {
      dispatch({ type: FETCH_ANY_APPLICATIONS, payload: { ...res.result } })
    }
    return res
  }
}

export const fetchNewApplicationsAction = (params: { start: number; count: number }) => {
  return async (dispatch: Dispatch<DocumentActionsTypes>) => {
    let res = await ServiceDocumentManager.applicationGetNew(params)

    if (res.result) {
      dispatch({ type: FETCH_NEW_APPLICATIONS, payload: { ...res.result } })
    }
    return res
  }
}
