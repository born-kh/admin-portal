import { OPEN_MENU, CLOSE_MENU, SettingsActionsTypes } from './types'

export const initialState = {
  openMenu: true,
}

export default (state = initialState, action: SettingsActionsTypes): { openMenu: boolean } => {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, openMenu: true }
    case CLOSE_MENU:
      return { ...state, openMenu: false }
    default:
      return state
  }
}
