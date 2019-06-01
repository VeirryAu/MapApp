import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { DESCRIPTION } from '../../constants'

const CustomHelmet = ({ title, meta = [], ...props }) => {
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={`${title} | ${DESCRIPTION}`}
      meta={([
        { name: 'theme-color', content: '#03A9F4' },
        { name: 'description', content: DESCRIPTION },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: `${title} | ${DESCRIPTION}` }
      ]).concat(meta)}
      {...props}
    >
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
    </Helmet>
  )
}

CustomHelmet.propTypes = {
  meta: PropTypes.array,
  title: PropTypes.string
}

CustomHelmet.defaultProps = {
  meta: [],
  title: 'MapApp'
}

CustomHelmet.defaultProps = {
  title: 'MapApp'
}

export default CustomHelmet
