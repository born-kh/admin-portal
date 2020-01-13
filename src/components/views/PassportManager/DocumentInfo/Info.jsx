import React, { Fragment } from 'react';
import { Col, Card, CardBody, CardHeader } from 'reactstrap';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import { dateFormatter } from 'helpers';

class Info extends React.Component {
  render() {
    const { application } = this.props;

    return (
      <Fragment>
        <Col md="6">
          <Card className="main-card mb-3">
            <CardHeader className="card-header-tab">
              <div className="card-header-title">Info</div>
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemHeading>Application ID</ListGroupItemHeading>
                  <ListGroupItemText>
                    {application.applicationID}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Country Name</ListGroupItemHeading>
                  <ListGroupItemText>
                    {application.countryName}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Country ISO Code</ListGroupItemHeading>
                  <ListGroupItemText>
                    {application.countryISOCode}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Date Time</ListGroupItemHeading>
                  <ListGroupItemText>
                    {dateFormatter(application.createdAt)}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>First Name</ListGroupItemHeading>
                  <ListGroupItemText>{application.firstName}</ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Last Name</ListGroupItemHeading>
                  <ListGroupItemText>{application.lastName}</ListGroupItemText>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
}

export default Info;
