import React from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  Container
} from 'reactstrap';

class Loading extends React.Component {
  constructor() {
    super();
    this.state = {};

  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="flex-row">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">
                  <i className="fa fa-spinner fa-spin"></i>
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default (Loading);