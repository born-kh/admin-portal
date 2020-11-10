import React, { FC } from 'react'
//next AppProps Type
import { AppProps } from 'next/app'
//storte
import { wrapper } from 'store'
//globale styles
import './styles.css'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
