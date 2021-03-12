import React, { useState, useEffect } from 'react'

import { makeStyles, Container, Box, Theme, createStyles, Paper } from '@material-ui/core'
import NavBar from './NavBar'
import TopBar from './TopBar'
import CopyRight from '@components/CopyRight'
import { LocalConsts } from '@Definitions'
import jsCookie from 'js-cookie'
import { useRouter } from 'next/router'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',

      width: '100%',
      minWidth: 800,
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',

      paddingTop: 64,
      [theme.breakpoints.up('lg')]: {
        paddingLeft: 256,
      },
    },
    contentContainer: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'auto',
    },

    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',

      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
)

const DashboardLayout = (props: any) => {
  const classes = useStyles()
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!jsCookie.get(LocalConsts.LocalStorage.token) || !jsCookie.get(LocalConsts.LocalStorage.refreshToken)) {
      router
        .push('/login')
        .then(() => {
          setIsChecking(true)
        })
        .catch(() => {
          setIsChecking(true)
        })
    } else {
      setTimeout(() => {
        setIsChecking(true)
      }, 500)
    }
  }, [])

  if (!isChecking) {
    return <></>
  }

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <Paper className={classes.wrapper} elevation={0}>
        <div className={classes.content}>
          <Container style={{ maxWidth: '100%' }} className={classes.container}>
            {props.children}
          </Container>
          <Box pt={4} style={{ marginBottom: 50 }}>
            <CopyRight />
          </Box>
        </div>
      </Paper>
    </div>
  )
}

export default DashboardLayout
