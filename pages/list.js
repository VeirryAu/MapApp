/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import CustomHelmet from '../src/components/CustomHelmet'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20
  }
})

class About extends React.Component {
  render () {
    const { classes, title } = this.props
    return (
      <div className={classes.root}>
        <CustomHelmet
          title={title}
        />

        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          list page
        </Typography>
        <Typography gutterBottom>
          <Link href="/home">
            <a>Go to the main page</a>
          </Link>
        </Typography>
        <Button variant="contained" color="primary">
          Do nothing button
        </Button>
      </div>
    )
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string
}

About.defaultProps = {
  title: 'About'
}

export default withStyles(styles)(About)
