export const OPEN_MENU = 'OPEN_MENU'
export const CLOSE_MENU = 'CLOSE_MENU'
export const CHANGE_THEME = 'CHANGE_THEME'

interface OpenMenuAction {
  type: typeof OPEN_MENU
}

interface CloseMenuAction {
  type: typeof CLOSE_MENU
}

interface ChangeThemeAction {
  type: typeof CHANGE_THEME
}

export type SettingsActionsTypes = OpenMenuAction | CloseMenuAction | ChangeThemeAction
