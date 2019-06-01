import React from 'react'
import PropTypes from 'prop-types'
import Document, { Main, NextScript } from 'next/document'
import Helmet from 'react-helmet'
import CustomHelmet from '../src/components/CustomHelmet'

export default class extends Document {
  static async getInitialProps (...args) {
    const documentProps = await super.getInitialProps(...args)
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() }
  }

  static contextTypes = {
    helmet: PropTypes.object
  }

  // should render on <html>
  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  static helmetJsx () {
    return (
      <CustomHelmet />
    )
  }

  render () {
    return (
      <html lang="en" dir="ltr">
        {this.helmetJsx}
        {this.helmetHeadComponents}
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
