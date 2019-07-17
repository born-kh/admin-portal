import React, { Component } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import PerfectScrollbar from 'react-perfect-scrollbar';

import { withStyles } from '@material-ui/core';

import ReactJson from 'react-json-view';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,



} from '@material-ui/core';

import { Portlet, PortletContent } from 'components';
import styles from './styles';

class MessagesTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    open: false,
    scroll: 'paper',
    rowIndex: 0,
    req: false,
    search: '',
    messages: this.props.messages
  };




  handleChangePage = (event, page) => {
    console.log("page", page)
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleClickOpen = (scroll, req, rowIndex) => () => {
    this.setState({ open: true, scroll, req, rowIndex });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeSearch = event => {
    this.setState({ search: event.target.value });
    const { search } = this.state;
    this.setState({
      errors: this.props.errors.filter(el => {
        return String(el.request.method).toLowerCase().indexOf(search.toLowerCase()) > -1
      })
    });
  };





  renderDialog() {
    if (this.state.open) {



      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            scroll={this.state.scroll}
            aria-labelledby="scroll-dialog-title">
            <DialogTitle id="scroll-dialog-title">{this.state.req ? 'Request' : 'Response'}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <ReactJson src={this.state.req ? this.props.messages[this.state.rowIndex].request : this.props.messages[this.state.rowIndex].response} />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
            </Button>
              <Button onClick={this.handleClose} color="primary">
                Ok
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    else {
      return "";
    }
  }




  render() {
    const { classes, className } = this.props;
    const { activeTab, rowsPerPage, page, messages } = this.state;

    const rootClassName = classNames(classes.root, className);
    console.log(this.props.users)
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">ts</TableCell>
                  <TableCell align="left"> <TextField
                    onChange={this.handleChangeSearch}
                    id="outlined-search"
                    label="Method"
                    type="search"
                    margin="dense"
                    variant="outlined"
                  /></TableCell>
                  <TableCell align="left"> Account ID</TableCell>
                  <TableCell align="left">Request</TableCell>
                  <TableCell align="left">Response</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {messages
                  .filter(message => {
                    if (activeTab === 1) {
                      return !message.returning;
                    }

                    if (activeTab === 2) {
                      return message.returning;
                    }

                    return message;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={index}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>


                          <Typography
                            className={classes.nameText}
                            variant="body1"
                          >
                            {row.ts}
                          </Typography>

                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.request.method}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.account_id}
                      </TableCell>

                      <TableCell align="center">
                        <Button variant="outlined" size="small" color="primary" onClick={this.handleClickOpen('paper', true, index)}>
                          Show
                  </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" size="small" color="primary" onClick={this.handleClickOpen('paper', false, index)}>
                          Show
                  </Button>
                      </TableCell>


                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={messages.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
        {this.renderDialog()}
      </Portlet>
    );
  }
}

MessagesTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  errors: PropTypes.array.isRequired
};



export default withStyles(styles)(MessagesTable);
