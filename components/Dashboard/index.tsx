import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
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
import CopyRight from '@components/CopyRight'
import Router, { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@store/reducers'
import { OPEN_MENU, CLOSE_MENU } from '@store/settings/types'
import CircularProgress from '@material-ui/core/CircularProgress'
import * as authAPI from 'service/authAPI'
import { AUTH_STATUS } from '@utils/constants'
import SignIn from 'pages/login'
import Backdrop from '@material-ui/core/Backdrop'
import Head from 'next/head'
import { resetServerContext } from 'react-beautiful-dnd'
import Loader from '@components/common/Loader'
export default function Dashboard(props: any) {
  const classes = useStyles()
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const states = useSelector((state: RootState) => {
    return {
      openMenu: state.settings.openMenu,
      authStatus: state.authStatus,
    }
  })

  const handleDrawerOpen = () => {
    dispatch({ type: OPEN_MENU })
  }
  const handleDrawerClose = () => {
    dispatch({ type: CLOSE_MENU })
  }

  const handleLogout = () => {
    dispatch(authAPI.logout())
      .then(() => {
        router.push('/login')
      })
      .catch(() => {
        router.push('/login')
      })
  }
  useEffect(() => {
    if (states.authStatus === AUTH_STATUS.loggedOut) {
      router.push('/login')
    }
  }, [states.authStatus])

  useEffect(() => {
    dispatch(authAPI.checkAuth())
  }, [dispatch])

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  resetServerContext()
  if (states.authStatus !== AUTH_STATUS.loggedOn) {
    return <Loader size={200} />
  }
  return (
    <div className={classes.root}>
      <Head>
        <title>{props.title} </title>
      </Head>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, states.openMenu && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, states.openMenu && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Tamos Admin
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !states.openMenu && classes.drawerPaperClose),
        }}
        open={states.openMenu}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems()}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
        {/* <Box pt={4}>
          <CopyRight />
        </Box> */}
      </main>
      {/* <Backdrop className={classes.backdrop} open={states.authStatus !== AUTH_STATUS.loggedOn}>
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </div>
  )
}
