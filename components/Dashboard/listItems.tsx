import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import PeopleIcon from '@material-ui/icons/People'
import AssignmentIcon from '@material-ui/icons/Assignment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NAVIGATOR } from '@utils/constants'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle'
import Assessment from '@material-ui/icons/Assessment'
import AssignmentInd from '@material-ui/icons/AssignmentInd'
import Equalizer from '@material-ui/icons/Equalizer'
export const mainListItems = () => {
  const router = useRouter()
  const { userManager, tracerManager, documentManager, apiKeyManager, statistics } = NAVIGATOR

  return (
    <div>
      <Link href={userManager.path} passHref>
        <ListItem button selected={router.pathname.includes(userManager.path)}>
          <ListItemIcon>
            <SupervisedUserCircle />
          </ListItemIcon>
          <ListItemText primary={userManager.name} />
        </ListItem>
      </Link>

      <Link href={tracerManager.path} passHref>
        <ListItem button selected={router.pathname.includes(tracerManager.path)}>
          <ListItemIcon>
            <Assessment />
          </ListItemIcon>
          <ListItemText primary={tracerManager.name} />
        </ListItem>
      </Link>
      <Link href={documentManager.path} passHref>
        <ListItem button selected={router.pathname.includes(documentManager.path)}>
          <ListItemIcon>
            <AssignmentInd />
          </ListItemIcon>
          <ListItemText primary={documentManager.name} />
        </ListItem>
      </Link>
      <Link href={apiKeyManager.path} passHref>
        <ListItem button selected={router.pathname.includes(apiKeyManager.path)}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={apiKeyManager.name} />
        </ListItem>
      </Link>
      <Link href={statistics.path} passHref>
        <ListItem button selected={router.pathname.includes(statistics.path)}>
          <ListItemIcon>
            <Equalizer />
          </ListItemIcon>
          <ListItemText primary={statistics.name} />
        </ListItem>
      </Link>
    </div>
  )
}

export const secondaryListItems = () => {
  const router = useRouter()
  const { settings } = NAVIGATOR
  return (
    <div>
      <ListSubheader inset>Settings</ListSubheader>
      <Link href={settings.auth.path} passHref>
        <ListItem button selected={router.pathname.includes(settings.auth.path)}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={settings.auth.name} />
        </ListItem>
      </Link>
      <Link href={settings.system.path} passHref>
        <ListItem button selected={router.pathname.includes(settings.system.path)}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={settings.system.name} />
        </ListItem>
      </Link>
    </div>
  )
}
