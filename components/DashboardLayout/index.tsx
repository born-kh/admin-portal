import React, { useState } from 'react'

import { makeStyles, Container, Box, Theme, createStyles } from '@material-ui/core'
import NavBar from './NavBar'
import TopBar from './TopBar'
import CopyRight from '@components/CopyRight'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      width: '100%',
      minWidth: 800,
    },
    wrapper: {
      display: 'flex',
      flex: '1 1 auto',
      overflow: 'hidden',
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
      height: '100vh',
      overflow: 'hidden',
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

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar onMobileClose={() => setMobileNavOpen(false)} openMobile={isMobileNavOpen} />
      <main className={classes.wrapper}>
        <div className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            {props.children}
          </Container>
          <Box pt={4}>
            <CopyRight />
          </Box>
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
