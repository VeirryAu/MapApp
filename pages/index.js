/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CustomHelmet from '../src/components/CustomHelmet'
import '../src/style.less'

const styles = () => ({
  root: {
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 40
  }
})

class AppIndex extends React.Component {
  render () {
    const { classes, title } = this.props

    return (
      <div className={classes.root}>
        <CustomHelmet
          title={title}
        />
      </div>
    )
  }
}

AppIndex.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
}

AppIndex.defaultProps = {
  title: 'Home'
}

export default withStyles(styles)(AppIndex)
