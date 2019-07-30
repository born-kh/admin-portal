import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import userPhoto from "assets/images/user.png"
import { withStyles } from '@material-ui/core';
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import { getInitials } from 'helpers';
import { Portlet, PortletContent } from 'components';
import styles from './styles';

class UsersTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, users } = this.props;
    const { activeTab, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="left">User Name</TableCell>
                  <TableCell align="left">ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter(user => {
                    if (activeTab === 1) {
                      return !user.returning;
                    }

                    if (activeTab === 2) {
                      return user.returning;
                    }

                    return user;
                  })
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.accountID}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>

                          <Avatar
                            className={classes.avatar}
                            src={user.avatar !== undefined ? `https://wssdev.nexustls.com/files/file/${user.avatar}/medium` : userPhoto}
                          >
                            {getInitials(user.firstName)}
                          </Avatar>
                          <Link to={`/users/${user.accountID}`}>
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              
                              {user.firstName}
                              {user.lastName}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.username}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.accountID}
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
            count={users.length}
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
      </Portlet>
    );
  }
}

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);
