import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import {
  Portlet, PortletContent, PortletHeader,
  PortletLabel,
  PortletToolbar,
} from 'components';
import styles from './styles';

class BlockTable extends Component {
  state = {
    rowsPerPage: 10,
    page: 0
  };



  renderBlockList() {
    const { classes, blockList } = this.props;

    const { activeTab, rowsPerPage, page } = this.state;


    if (this.props.blockList.length === 0) {
      return <PortletContent><Typography variant="h6">There are no ...</Typography></PortletContent>;
    }

    return (

      <PortletContent noPadding>
        <PerfectScrollbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Account ID</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {blockList
                .filter(block => {
                  if (activeTab === 1) {
                    return !block.returning;
                  }

                  if (activeTab === 2) {
                    return block.returning;
                  }

                  return block;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(block => (
                  <TableRow
                    className={classes.tableRow}

                    key={block.accoun_id}
                  >

                    <TableCell className={classes.tableCell}>
                      {block.account_id}
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
          count={blockList.length}
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

    );
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className } = this.props;


    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>

        <PortletHeader noDivider>
          <PortletLabel

            title="Block List"
          />
          <PortletToolbar>

          </PortletToolbar>
        </PortletHeader>
        {this.renderBlockList()}
      </Portlet>
    );
  }
}

BlockTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,

};

const mapStateToProps = (state) => {

  return {
    blockList: state.session.blockList
  }

};



export default withStyles(styles)(connect(mapStateToProps)(BlockTable));

