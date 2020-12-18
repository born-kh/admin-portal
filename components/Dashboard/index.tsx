import React from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { mainListItems, secondaryListItems } from './listItems'
import { useStyles } from './styles'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@store/reducers'
import { OPEN_MENU, CLOSE_MENU, CHANGE_THEME } from '@store/settings/types'

import Head from 'next/head'
import { resetServerContext } from 'react-beautiful-dnd'
import CopyRight from '@components/CopyRight'
import { Box, Tooltip } from '@material-ui/core'
import DropDownLanguage from '@components/common/DropDownLanguage'
import Brightness3Icon from '@material-ui/icons/Brightness3'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import useTranslation from 'hooks/useTranslation'
import { authAPI } from 'service/api'

export default function Dashboard(props: any) {
  const classes = useStyles()
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()

  const states = useSelector((state: RootState) => {
    return {
      settings: state.settings,
      authStatus: state.auth.authStatus,
    }
  })
  const { t } = useTranslation()

  const iconTheme = !states.settings.theme ? <Brightness7Icon /> : <Brightness3Icon />

  const handleDrawerOpen = () => {
    dispatch({ type: OPEN_MENU })
  }
  const handleDrawerClose = () => {
    dispatch({ type: CLOSE_MENU })
  }

  const handleLogout = () => {
    authAPI
      .logout()
      .then(() => {
        router.push('/login')
      })
      .catch(() => {
        router.push('/login')
      })
  }

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  resetServerContext()

  return (
    <div className={classes.root}>
      <Head>
        <title>{props.title} </title>
      </Head>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, states.settings.openMenu && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, states.settings.openMenu && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {t('admin')}
          </Typography>

          <DropDownLanguage />
          <Tooltip title={t('changeTheme')}>
            <IconButton color="inherit" onClick={() => dispatch({ type: CHANGE_THEME })}>
              {iconTheme}
            </IconButton>
          </Tooltip>

          <Tooltip title={t('logout')}>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !states.settings.openMenu && classes.drawerPaperClose),
        }}
        open={states.settings.openMenu}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems()}</List>
        <Divider style={{ width: 240 }} />
        <List>{secondaryListItems()}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
        <Box pt={4}>
          <CopyRight />
        </Box>
      </main>
    </div>
  )
}
