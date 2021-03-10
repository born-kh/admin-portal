import React, { useState } from 'react'

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { AppBar, Badge, Box, Hidden, IconButton, Toolbar, makeStyles, Tooltip } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined'
import InputIcon from '@material-ui/icons/Input'
import useTranslation from 'hooks/useTranslation'
import { AppDispatch, RootState } from '@store/reducers'
import { useDispatch, useSelector } from 'react-redux'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import { OPEN_MENU, CLOSE_MENU, CHANGE_THEME } from '@store/settings/types'
import { logout } from '@store/auth/actions'
import DropDownLanguage from '@components/common/DropDownLanguage'
import LogoIcon from '@components/common/LogoIcon'
import { LocalConsts } from '@Definitions'
import { useRouter } from 'next/router'
import jsCookie from 'js-cookie'
// import Logo from 'src/components/Logo'

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}))
type PropsType = {
  className?: string
  onMobileNavOpen: () => void
}

const TopBar = ({ className, onMobileNavOpen, ...rest }: PropsType) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const dispatch: AppDispatch = useDispatch()

  const states = useSelector((state: RootState) => {
    return {
      settings: state.settings,
      authStatus: state.auth.authStatus,
    }
  })
  const router = useRouter()

  const iconTheme = !states.settings.theme ? <Brightness7Icon /> : <Brightness3Icon />

  const handleDrawerOpen = () => {
    dispatch({ type: OPEN_MENU })
  }
  const handleDrawerClose = () => {
    dispatch({ type: CLOSE_MENU })
  }

  const handleLogout = () => {
    jsCookie.remove(LocalConsts.LocalStorage.token)
    jsCookie.remove(LocalConsts.LocalStorage.refreshToken)
    setTimeout(() => {
      router.push('/login')
    }, 500)
  }

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <LogoIcon />

        <Box flexGrow={1} />
        <Hidden mdDown>
          {/* <IconButton color="inherit">
            <Badge badgeContent={notifications.length} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}

          <DropDownLanguage />
          <Tooltip title={t('changeTheme')}>
            <IconButton color="inherit" onClick={() => dispatch({ type: CHANGE_THEME })}>
              {iconTheme}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('logout')}>
            <IconButton color="inherit" onClick={handleLogout}>
              <InputIcon />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
