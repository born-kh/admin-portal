import React, { FC, useEffect } from 'react'
//next AppProps Type
import { AppProps, Container } from 'next/app'
//storte
import { wrapper } from 'store'
//globale styles
import './styles.css'
import LanguageProvider from '@components/common/LanguageProvider'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@store/reducers'
import Dashboard from '@components/Dashboard'
import { AUTH_STATUS } from '@utils/constants'
import Loader from '@components/common/Loader'
import { checkAuth } from '@store/auth/actions'

const WrappedApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  const state = useSelector((state: RootState) => {
    return {
      theme: state.settings.theme,
      authStatus: state.auth.authStatus,
      username: state.auth.username,
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
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  if (router.pathname.startsWith('/login')) {
    return (
      <React.StrictMode>
        <MuiThemeProvider theme={state.theme ? lightTheme : darkTheme}>
          <Component {...pageProps} />
        </MuiThemeProvider>
      </React.StrictMode>
    )
  }
  if (state.authStatus !== AUTH_STATUS.loggedOn) {
    return <Loader size={100} />
  }
  return (
    <React.StrictMode>
      <MuiThemeProvider theme={state.theme ? lightTheme : darkTheme}>
        <LanguageProvider>
          <Dashboard>
            <Component {...pageProps} key={router.route} />
          </Dashboard>
        </LanguageProvider>
      </MuiThemeProvider>
    </React.StrictMode>
  )
}

// WrappedApp.getInitialProps = async ({ Component, ctx }) => {
//   return {
//     pageProps: {
//       ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
//       pathname: ctx.pathname,
//     },
//   }
// }

export default wrapper.withRedux(WrappedApp)
