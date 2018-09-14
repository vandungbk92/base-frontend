import React, {Component} from 'react';
import {Button, Col, Container, Input, InputGroup, InputGroupAddon, Row} from 'reactstrap';
import {Link} from 'react-router-dom'
import {RESOURCE} from "../../common/resource";
import {URL} from "../../common/url";

class ForgotPassword extends Component {
  redirect(url) {
    if (this.props.history.location.pathname === url) return
    this.props.history.push(url)
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <InputGroup className="input-prepend">
                <Input size="16" type="email" placeholder={RESOURCE[0].email}/>
                <InputGroupAddon addonType="append">
                  <Button color="primary">{RESOURCE[0].sendForgotPassword}</Button>
                </InputGroupAddon>
              </InputGroup>
              <br/>
              <Button color="danger" block onClick={() => this.redirect(URL.HOME)}>
                {RESOURCE[0].backToSignIn}
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ForgotPassword;
