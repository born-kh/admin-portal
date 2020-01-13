import React, { Fragment } from 'react';
import Loader from 'react-loaders';
import { Col, Card, CardBody, CardHeader, Table } from 'reactstrap';
import Lightbox from 'react-image-lightbox';

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  render() {
    const { documents, pending } = this.props;
    return (
      <Fragment>
        <Col
          lg="12"
          xl="6"
        >
          <Card className="main-card mb-3">
            <CardHeader className="card-header-tab">
              <div className="card-header-title">Documents</div>
            </CardHeader>
            <CardBody>
              {pending && (
                <div className="text-center">
                  <Loader type="ball-scale" />
                </div>
              )}
              {!pending && (
                <Table
                  bordered
                  className="mb-0"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Document Info</th>
                      <th>Image</th>
                    </tr>
                  </thead>

                  {documents.map((document, index) => {
                    return (
                      <tbody>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td width="50%">
                            <b className="text-dark">Doc ID: </b>
                            {document.ID}
                            <div className="divider" />
                            <b className="text-dark">File name: </b>
                            {document.fileInfo.originalName}
                            <div className="divider" />
                            <b className="text-dark">Status: </b>
                            {document.status}
                            <div className="divider" />
                            <b className="text-dark">Type name: </b>
                            {document.documentType.typeName}
                            <div className="divider" />
                            <b className="text-dark">Size: </b>
                            {document.fileInfo.size}
                            <div className="divider" />
                            <b className="text-dark">Upload IP: </b>
                            {document.fileInfo.uploadIP}
                            <div className="divider" />
                          </td>

                          <td
                            align="center"
                            width="40%"
                          >
                            <img
                              alt=""
                              className="after-img"
                              height="250px"
                              onClick={() =>
                                this.setState({
                                  isOpen: true,
                                  docID: document.docID
                                })
                              }
                              src={`http://10.7.8.129:9004/document/${document.ID}`}
                              style={{
                                cursor: 'pointer',
                                'max-width': '100%',
                                'max-height': '100%'
                              }}
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={`http://10.7.8.129:9004/document/${this.state.ID}`}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </Fragment>
    );
  }
}

export default DocumentList;
