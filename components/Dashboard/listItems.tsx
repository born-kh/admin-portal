import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import PeopleIcon from '@material-ui/icons/People'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NAVIGATOR, USER_PERMISSION, USER_PERMISSION_TYPE } from '@utils/constants'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle'
import Assessment from '@material-ui/icons/Assessment'
import AssignmentInd from '@material-ui/icons/AssignmentInd'
import Equalizer from '@material-ui/icons/Equalizer'
import useTranslation from 'hooks/useTranslation'
export const mainListItems = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { userManager, tracerManager, documentManager, apiKeyManager, statistics } = NAVIGATOR
  let permissions = JSON.parse(localStorage.getItem(USER_PERMISSION) || '') || []
  let navList = []
  if (permissions.TAP_MODIFY_USER_MANAGER === USER_PERMISSION_TYPE.allow) {
    navList.push(
      <Link href={userManager.path} passHref key={userManager.path}>
        <ListItem button selected={router.pathname.includes(userManager.path)}>
          <ListItemIcon>
            <SupervisedUserCircle />
          </ListItemIcon>
          <ListItemText primary={t('usersPage')} />
        </ListItem>
      </Link>
    )
  }

  if (permissions.TAP_MODIFY_TRACER_MANAGER === USER_PERMISSION_TYPE.allow) {
    navList.push(
      <Link href={tracerManager.path} passHref key={tracerManager.path}>
        <ListItem button selected={router.pathname.includes(tracerManager.path)}>
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary={t('tracerPage')} />
        </ListItem>
      </Link>
    )
  }

  if (permissions.TAP_MODIFY_PASSPORT_MANAGER === USER_PERMISSION_TYPE.allow) {
    navList.push(
      <Link href={documentManager.path} passHref key={documentManager.path}>
        <ListItem button selected={router.pathname.includes(documentManager.path)}>
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary={t('documentPage')} />
        </ListItem>
      </Link>
    )
  }

  if (permissions.TAP_MODIFY_API_KEY_MANAGER === USER_PERMISSION_TYPE.allow) {
    navList.push(
      <Link href={apiKeyManager.path} passHref key={apiKeyManager.path}>
        <ListItem button selected={router.pathname.includes(apiKeyManager.path)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={t('apiKeyPage')} />
        </ListItem>
      </Link>
    )
  }

  if (permissions.TAP_MODIFY_STATISTICS === USER_PERMISSION_TYPE.allow) {
    navList.push(
      <Link href={statistics.path} passHref key={statistics.path}>
        <ListItem button selected={router.pathname.includes(statistics.path)}>
          <ListItemIcon>
            <Equalizer />
          </ListItemIcon>
          <ListItemText primary={t('statisticsPage')} />
        </ListItem>
      </Link>
    )
  }
  return navList
}

export const secondaryListItems = () => {
  const router = useRouter()
  const { settings } = NAVIGATOR
  let permissions = JSON.parse(localStorage.getItem(USER_PERMISSION) || '[]') || []
  let navList = []
  if (permissions.TAP_MODIFY_SETTINGS === USER_PERMISSION_TYPE.allow) {
    navList.push(
      <div key={'TAP_MODIFY_SETTINGS'}>
        <ListSubheader inset>Settings</ListSubheader>
        <Link href={settings.path} passHref key={settings.path}>
          <ListItem button selected={router.pathname.includes(settings.path)}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={settings.name} />
          </ListItem>
        </Link>
      </div>
    )
  }
  return navList
}
