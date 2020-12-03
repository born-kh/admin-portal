import React, { FC, useEffect } from 'react'
//next AppProps Type
import { AppProps, Container } from 'next/app'
//storte
import { wrapper } from 'store'
//globale styles
import './styles.css'
import LanguageProvider from '@components/common/LanguageProvider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@store/reducers'
import Dashboard from '@components/Dashboard'
import { AUTH_STATUS } from '@utils/constants'
import { checkAuth } from 'service/authAPI'
import Loader from '@components/common/Loader'

const WrappedApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  const state = useSelector((state: RootState) => {
    return {
      theme: state.settings.theme,
      authStatus: state.authStatus,
    }
  })
  const dispatch: AppDispatch = useDispatch()
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  })

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
    },
  })

  useEffect(() => {
    if (state.authStatus === AUTH_STATUS.loggedOut) {
      router.push('/login')
    }
  }, [state.authStatus])

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  if (router.pathname.startsWith('/login')) {
    return (
      <Container>
        <React.StrictMode>
          <ThemeProvider theme={state.theme ? lightTheme : darkTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </React.StrictMode>
      </Container>
    )
  }
  if (state.authStatus !== AUTH_STATUS.loggedOn) {
    return <Loader size={100} />
  }
  return (
    <Container>
      <React.StrictMode>
        <ThemeProvider theme={state.theme ? lightTheme : darkTheme}>
          <LanguageProvider>
            <Dashboard>
              <Component {...pageProps} key={router.route} />
            </Dashboard>
          </LanguageProvider>
        </ThemeProvider>
      </React.StrictMode>
    </Container>
  )
}

export default wrapper.withRedux(WrappedApp)
