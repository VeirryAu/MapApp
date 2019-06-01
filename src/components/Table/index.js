import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TablePaginationActionsWrapped from './TablePaginatonActions'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class CustomPaginationActionsTable extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 10
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value })
  }

  render () {
    const { classes } = this.props
    const { rowsPerPage, page } = this.state
    const { dataSource, columns } = this.props
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataSource.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {columns.map((data, index) => (
                  <TableCell key={index}>{data.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSource.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                return (
                  <TableRow key={index}>
                    {columns.map((column, idx) => {
                      let cell = row[column.dataIndex]

                      if (column.render) {
                        cell = column.render(row[column.dataIndex], row) || row[column.dataIndex]
                      }
                      return (
                        <TableCell key={idx} component="th" scope="row">
                          {cell || ''}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  colSpan={3}
                  count={dataSource.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    )
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired
}

export default withStyles(styles)(CustomPaginationActionsTable)
