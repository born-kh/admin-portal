import React, { Fragment } from 'react';
import { Button, CustomInput } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ReactTable from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

export default class WizardStepSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      isOpen: false,
      checked: false,
      docID: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleCheckbox = (e, docID) => {
    const { getDocumentID } = this.props;
    if (e.target.checked === true) {
      this.setState({ docID });
      getDocumentID(docID);
    } else {
      this.setState({ docID: undefined });
      getDocumentID(undefined);
    }
  };
  render() {
    const { documents, getDocumentSetID } = this.props;

    let setGroups = _.values(_.groupBy(documents, 'documenSet.ID')).map(d => ({
      group: d[0],
      count: d.length
    }));

    return (
      <Fragment>
        <ReactTable
          className="-striped -highlight"
          columns={[
            {
              columns: [
                {
                  Header: '№',
                  accessor: 'row',
                  id: 'row',
                  width: 50,

                  Cell: row => (
                    <div className="d-block w-100 text-center">
                      {row.index + 1}
                    </div>
                  )
                },
                {
                  Header: 'Set Name',
                  accessor: 'group.documenSet.setName'
                },
                {
                  Header: 'Documents',
                  accessor: 'count'
                },

                {
                  Header: 'Check Set',
                  id: 'rows',
                  width: 150,
                  accessor: d => d,

                  Cell: row => (
                    <div className="d-block w-100 text-center">
                      <Button
                        className="border-0 btn-transition"
                        color="primary"
                        onClick={() =>
                          getDocumentSetID(row.value.group.documenSet.ID)
                        }
                        outline
                      >
                        <FontAwesomeIcon
                          icon={faSignInAlt}
                          size="2x"
                        />
                      </Button>
                    </div>
                  )
                }
              ]
            }
          ]}
          data={setGroups}
          defaultPageSize={5}
          disableGrouping
          showPageSizeOptions={false}
          showPagination={false}
          showPaginationBottom={false}
          showPaginationTop={false}
        />
      </Fragment>
    );
  }
}
