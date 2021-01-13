import { ERROR_CODES, DateConvertType, USER_NAME, USER_PERMISSION, USER_PERMISSION_TYPE, NAVIGATOR } from './constants'
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
import { NavItemType } from '@components/DashboardLayout/NavBar/NavItem'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircleOutlined'
import Assessment from '@material-ui/icons/AssessmentOutlined'
import AssignmentInd from '@material-ui/icons/AssignmentIndOutlined'
import Equalizer from '@material-ui/icons/EqualizerOutlined'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import SettingsSystemDaydreamOutlinedIcon from '@material-ui/icons/SettingsSystemDaydreamOutlined'
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined'
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
  let permissions = JSON.parse(localStorage.getItem(USER_PERMISSION) || '') || []
  const { userManager, tracerManager, documentManager, apiKeyManager, statistics, settings } = NAVIGATOR
  let navItems = []
  let managmentItems = []
  let statisticsItems = []
  let settingsItems = []

  switch (USER_PERMISSION_TYPE.allow) {
    case permissions.TAP_MODIFY_USER_MANAGER:
      managmentItems.push({
        href: userManager.path,
        title: userManager.name,
        icon: SupervisedUserCircle,
      })

    case permissions.TAP_MODIFY_PASSPORT_MANAGER:
      managmentItems.push({
        href: documentManager.path,
        title: documentManager.name,
        icon: AssignmentInd,
      })
    case permissions.TAP_MODIFY_TRACER_MANAGER:
      statisticsItems.push({
        href: tracerManager.path,
        title: tracerManager.name,
        icon: Assessment,
      })
    case permissions.TAP_MODIFY_API_KEY_MANAGER:
      managmentItems.push({
        href: apiKeyManager.path,
        title: apiKeyManager.name,
        icon: VpnKeyOutlinedIcon,
      })
    case permissions.TAP_MODIFY_BACKED_SETTINGS:
      settingsItems.push({
        href: settings.path,
        title: settings.name,
        icon: SettingsSystemDaydreamOutlinedIcon,
      })

    case permissions.TAP_MODIFY_STATISTICS:
      // statisticsItems.push({
      //   href: statistics.path,
      //   title: statistics.name,
      //   icon: BarChartIcon2,
      // })

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

    default:
  }

  if (managmentItems.length > 0) {
    navItems.push({ title: 'Managment', items: managmentItems })
  }

  if (managmentItems.length > 0) {
    navItems.push({ title: 'Settings', items: settingsItems })
  }

  if (managmentItems.length > 0) {
    navItems.push({ title: 'Statistics', items: statisticsItems })
  }

  return navItems
}
