import React, { FC, useEffect } from 'react'
//next AppProps Type
import { AppProps, Container, AppContext, AppInitialProps } from 'next/app'
//storte
import { wrapper } from 'store'
//globale styles
import './styles.css'
import LanguageProvider from '@components/common/LanguageProvider'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '@store/reducers'
import Dashboard from '@components/DashboardLayout'

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

  // useEffect(() => {
  //   ServiceApiKeyManager.apiKeyGet({})
  // }, [])
  // useEffect(() => {
  //   ServiceWebsocket.start()
  //   ServiceWebsocket.subscribe(newMessagehandlerCreater)

  //   return () => {
  //     ServiceWebsocket.unsubscribe(newMessagehandlerCreater)
  //     ServiceWebsocket.stop()
  //   }
  // }, [])

  // const newMessagehandlerCreater = (messages: any) => {
  //   console.log('messages', messages)

  //   if (messages.method === 'client.authorization') {
  //     const params = {
  //       id: HelpersUtils.uuidv4(),
  //       method: 'gateway.system.apikey.get',
  //       params: {},
  //       version: 1,
  //     }
  //     ServiceWebsocket.sendMessage(params)
  //   }
  // }

  // useEffect(() => {
  //   if (state.authStatus === AUTH_STATUS.loggedOut) {
  //     router.push('/login')
  //   }
  // }, [state.authStatus])

  useEffect(() => {
    // if (!cleanUpFunction) {
    // dispatch(checkAuth())
    // }
    // const jssStyles = document.querySelector('#jss-server-side')
    // if (jssStyles && jssStyles.parentNode) {
    //   jssStyles.parentNode.removeChild(jssStyles)
    // }
    // return (cleanUpFunction = true)
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
  // if (state.authStatus !== AUTH_STATUS.loggedOn) {
  //   return <Loader size={70} />
  // }
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

export default wrapper.withRedux(WrappedApp)

// export async function getServerSideProps({ Component, ctx }: AppContext): Promise<AppInitialProps> {
//   const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

//   return { pageProps }
// }
