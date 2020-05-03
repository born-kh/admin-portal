import React, { Fragment } from 'react';
import Loader from 'react-loaders';
import {
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import avatar6 from 'assets/utils/images/avatars/2.jpg';
import bg1 from 'assets/utils/images/dropdown-header/abstract1.jpg';

import { RViewerTrigger, RViewer } from 'react-viewerjs';
import { imageOptions } from 'constants/ActionType';
import { getDocumentStatusText } from 'helpers';
class DocumentList extends React.Component {
  renderTable() {
    const { documents, pending, error } = this.props;
    console.log(pending, error);

    if (pending) {
      return (
        <div className="text-center">
          <Loader type="ball-scale" />
        </div>
      );
    }

    if (error) {
      if (!error.accountID) {
        return (
          <div className="dropdown-menu-header">
            <div className="dropdown-menu-header-inner bg-primary">
              <div className="menu-header-content">
                <div className="widget-subheading">{error}</div>
              </div>
            </div>
          </div>
        );
      }
      var userInfo = error;

      return (
        <Card className="card-shadow-primary profile-responsive card-border mb-3">
          <CardHeader>Заявка уже открыто </CardHeader>
          <div className="dropdown-menu-header">
            <div className="dropdown-menu-header-inner bg-info">
              <div
                className="menu-header-image opacity-2"
                style={{
                  backgroundImage: 'url(' + bg1 + ')'
                }}
              />
              <div className="menu-header-content btn-pane-right">
                <div className="avatar-icon-wrapper mr-2 avatar-icon-xl">
                  <div className="avatar-icon rounded">
                    <img
                      alt="Avatar 5"
                      src={
                        userInfo.avatar !== undefined
                          ? `https://wssdev.nexustls.com/files/file/${userInfo.avatar}/medium`
                          : avatar6
                      }
                    />
                  </div>
                </div>
                <div>
                  <h5 className="menu-header-title">
                    {userInfo.firstName} {userInfo.lastName}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <CardBody className="p-0">
            <ListGroup flush>
              <ListGroupItem>
                <b className="text-dark">First Name: </b>
                {userInfo.firstName}
              </ListGroupItem>
              <ListGroupItem>
                <b className="text-dark">Last Name: </b>
                {userInfo.lastName}
              </ListGroupItem>
              <ListGroupItem>
                <b className="text-dark">User Name: </b>
                {userInfo.username}
              </ListGroupItem>
              <ListGroupItem>
                <b className="text-dark">Account ID: </b>
                {userInfo.accountID}
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      );
    }
    if (documents.length == 0) {
      return (
        <div className="dropdown-menu-header">
          <div className="dropdown-menu-header-inner bg-primary">
            <div className="menu-header-content">
              <div className="widget-subheading">There are no documents</div>
            </div>
          </div>
        </div>
      );
    }

    if (documents.length > 0) {
      return (
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
                    <b className="text-dark">Status: </b>
                    {getDocumentStatusText(document.status)}
                    <div className="divider" />
                    <b className="text-dark">File name: </b>
                    {document.fileInfo.originalName}

                    <div className="divider" />
                    <b className="text-dark">Type name: </b>
                    {document.documentType.typeName}
                  </td>

                  <td
                    align="center"
                    height="200px"
                    width="40%"
                  >
                    <RViewer
                      imageUrls={`http://10.7.8.129:9004/document/${document.ID}`}
                      options={imageOptions}
                    >
                      <RViewerTrigger>
                        <img
                          src={`http://10.7.8.129:9004/document/${document.ID}`}
                          style={{
                            cursor: 'pointer',
                            'max-width': '100%',
                            'max-height': '100%',
                            verticalAlign: 'middle'
                          }}
                        />
                      </RViewerTrigger>
                    </RViewer>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      );
    }
  }

  render() {
    const { documents, pending, error } = this.props;
    console.log(error);

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
            <CardBody>{this.renderTable()}</CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
}

export default DocumentList;
