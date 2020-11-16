import { OPEN_MENU, CLOSE_MENU, SettingsActionsTypes, CHANGE_THEME } from './types'

export const initialState = {
  openMenu: true,
  theme: true,
}

export default (state = initialState, action: SettingsActionsTypes): { openMenu: boolean; theme: boolean } => {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, openMenu: true }
    case CLOSE_MENU:
      return { ...state, openMenu: false }
    case CHANGE_THEME:
      return { ...state, theme: !state.theme }
    default:
      return state
  }
}
