import React from 'react'
import App, { Container } from 'next/app'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import Router from 'next/router'
import NProgress from 'nprogress'
import client from '../src/utils/apolloClient'
import Header from '../src/components/Header'
import OfflineSupport from '../src/components/OfflineSupport'
import getPageContext from '../src/utils/getPageContext'
import CustomHelmet from '../src/components/CustomHelmet'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#03A9F4',
      light: '#B3E5FC',
      dark: '#0288D1',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#FF5722',
      light: '#FF5722',
      dark: '#E64A19',
      contrastText: '#FFFFFF'
    }
  },
  typography: { useNextVariants: true }
})

Router.events.on('routeChangeStart', () => NProgress.start())

Router.events.on('routeChangeComplete', () => NProgress.done())

Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  constructor () {
    super()
    this.pageContext = getPageContext()
  }

  componentDidMount () {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={client}>
          <CustomHelmet />
          <OfflineSupport />
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <Header />
              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default MyApp
