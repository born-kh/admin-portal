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
              <div className="card-header-title">Appplication Info</div>
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem>
                  <ListGroupItemText>First Name</ListGroupItemText>
                  <ListGroupItemHeading>
                    {application.firstName}
                  </ListGroupItemHeading>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemText>Last Name</ListGroupItemText>
                  <ListGroupItemHeading>
                    {application.lastName}
                  </ListGroupItemHeading>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemText>Application status</ListGroupItemText>
                  <ListGroupItemHeading>
                    {application.status}
                  </ListGroupItemHeading>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemText>Country Name</ListGroupItemText>
                  <ListGroupItemHeading>
                    {application.countryName}
                  </ListGroupItemHeading>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemText>Country ISO Code</ListGroupItemText>
                  <ListGroupItemHeading>
                    {application.countryISOCode}
                  </ListGroupItemHeading>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemText>Date Time</ListGroupItemText>
                  <ListGroupItemHeading>
                    {dateFormatter(application.createdAt)}
                  </ListGroupItemHeading>
                </ListGroupItem>

                <ListGroupItem>
                  <ListGroupItemText>Application ID</ListGroupItemText>
                  <ListGroupItemHeading>{application.ID}</ListGroupItemHeading>
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
