import React, { FC } from 'react'
//next AppProps Type
import { AppProps } from 'next/app'
//storte
import { wrapper } from 'store'
//globale styles
import './styles.css'
import LanguageProvider from '@components/common/LanguageProvider'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootState } from '@store/reducers'

const WrappedApp: FC<AppProps> = ({ Component, pageProps, router }) => {
  const state = useSelector((state: RootState) => {
    return {
      theme: state.settings.theme,
    }
  })
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

  return (
    <ThemeProvider theme={state.theme ? lightTheme : darkTheme}>
      <LanguageProvider>
        <Component {...pageProps} key={router.route} />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default wrapper.withRedux(WrappedApp)
