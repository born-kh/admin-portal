import {
  ERROR_CODES,
  DateConvertType,
  USER_NAME,
  USER_PERMISSION,
  USER_PERMISSION_TYPE,
  NAVIGATOR,
  USER_PERMISSIONS,
} from './constants'
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Search as SearchIcon,
  HardDrive as HardDriveIcon,
  Server as ServerIcon,
  BarChart2 as BarChartIcon2,
  Key as KeyIcon,
  Send as SendIcon,
  LogIn as LogInIcon,
  Database as DatabaseIcon,
} from 'react-feather'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircleOutlined'
import Assessment from '@material-ui/icons/AssessmentOutlined'
import AssignmentInd from '@material-ui/icons/AssignmentIndOutlined'
import Equalizer from '@material-ui/icons/EqualizerOutlined'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import SettingsSystemDaydreamOutlinedIcon from '@material-ui/icons/SettingsSystemDaydreamOutlined'
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined'
import jsCookie from 'js-cookie'
import { LocalConsts } from '@Definitions'

export function getErrorMsgFromCode(code: string | number | null) {
  switch (code) {
    case '':
      return null
    case ERROR_CODES.password.wrong:
      return 'Wrong credentials.'
    case ERROR_CODES.unknown:
      return 'Unknown error please try later.'
    default:
      return 'Unknown error please try later.'
  }
}

export const removeDuplicatesFromArrayByProperty = (arr: any[], prop: string) =>
  arr.reduce((accumulator, currentValue) => {
    if (!accumulator.find((obj: any) => obj[prop] === currentValue[prop])) {
      accumulator.push(currentValue)
    }
    return accumulator
  }, [])

export class HelpersUtils {
  public static uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}

export function dateFormatter(
  date: Date,
  locale = 'en-US',
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  }
) {
  if (date) {
    let new_date = new Intl.DateTimeFormat(locale, options)
    return new_date.format(new Date(date))
  }
  return null
}
export function convertMRZDate(str: string, dateConvertType: DateConvertType) {
  try {
    if (str && str.length >= 6) {
      var year = parseInt(str.substring(0, 2))
      var month = str.substring(2, 4)
      var day = str.substring(5, 7)

      switch (dateConvertType) {
        case DateConvertType.dob:
          let curYear = new Date().getFullYear()
          if (year + 2000 < curYear) {
            year += 2000
          } else {
            year += 1900
          }
          break
        case DateConvertType.expiry:
          year += 2000
          break
        case DateConvertType.issue:
          year += 2000 - 10
          break
        default:
      }

      const date = new Date(Number(year.toString()), Number(month), Number(day)).toISOString().split('.')[0] + 'Z'
      console.log(date)
      return date.substring(0, 10)
    }
    return new Date().toISOString().split('.')[0] + 'Z'
  } catch (e) {
    return new Date().toISOString().split('.')[0] + 'Z'
  }
}

export const getUsername = () => {
  return localStorage.getItem(USER_NAME) || ''
}

export const checkGetAllUserLogs = () => {
  let permissions = JSON.parse(localStorage.getItem(USER_PERMISSION) || '') || []
  return USER_PERMISSION_TYPE.allow === permissions.TAP_GET_USER_ALL_LOGS
}

export const getNavbarItems = () => {
  const { userManager, tracerManager, documentManager, apiKeyManager, statistics, settings } = NAVIGATOR
  let navItems = []
  let managmentItems = []
  let statisticsItems = []
  let settingsItems = []

  if (checkPermission(USER_PERMISSIONS.TAP_MODIFY_USER_MANAGER)) {
    managmentItems.push({
      href: userManager.path,
      title: userManager.name,
      icon: SupervisedUserCircle,
    })
  }

  if (checkPermission(USER_PERMISSIONS.TAP_MODIFY_PASSPORT_MANAGER)) {
    managmentItems.push({
      href: documentManager.path,
      title: documentManager.name,
      icon: AssignmentInd,
    })
  }

  if (checkPermission(USER_PERMISSIONS.TAP_MODIFY_TRACER_MANAGER)) {
    statisticsItems.push({
      href: tracerManager.path,
      title: tracerManager.name,
      icon: Assessment,
    })
  }
  if (checkPermission(USER_PERMISSIONS.TAP_MODIFY_API_KEY_MANAGER)) {
    managmentItems.push({
      href: apiKeyManager.path,
      title: apiKeyManager.name,
      icon: VpnKeyOutlinedIcon,
    })
  }

  if (checkPermission(USER_PERMISSIONS.TAP_MODIFY_BACKED_SETTINGS)) {
    settingsItems.push({
      href: settings.path,
      title: settings.name,
      icon: SettingsSystemDaydreamOutlinedIcon,
    })
  }

  if (checkPermission(USER_PERMISSIONS.TAP_MODIFY_STATISTICS)) {
    statisticsItems.push({
      href: statistics.authentication.path,
      title: statistics.authentication.name,
      icon: LogInIcon,
    })
    statisticsItems.push({
      href: statistics.cdr.path,
      title: statistics.cdr.name,
      icon: CallOutlinedIcon,
    })
    statisticsItems.push({
      href: statistics.app.path,
      title: statistics.app.name,
      icon: EqualizerOutlinedIcon,
    })
    statisticsItems.push({
      href: statistics.userLogs.path,
      title: statistics.userLogs.name,
      icon: DatabaseIcon,
    })
  }

  if (managmentItems.length > 0) {
    navItems.push({ title: 'managment', items: managmentItems })
  }

  if (managmentItems.length > 0) {
    navItems.push({ title: 'settings', items: settingsItems })
  }

  if (managmentItems.length > 0) {
    navItems.push({ title: 'statistics', items: statisticsItems })
  }

  return navItems
}

function checkPermission(permission: USER_PERMISSIONS) {
  let permissions: string[] = JSON.parse(localStorage.getItem(LocalConsts.LocalStorage.userPermissions) || '') || []
  const findIndex = permissions.findIndex((item) => item === permission)
  if (findIndex === -1) {
    return false
  } else {
    return true
  }
}
