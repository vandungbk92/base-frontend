import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {fetchLoginRequest} from '../../epics-reducers/fetch/fetch-login.duck'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {RESOURCE} from "../../common/resource";
import {URL} from "../../common/url";

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginFunction = this.loginFunction.bind(this);
    this.changeElement = this.changeElement.bind(this)
    this.state = {
      username: "admin",
      password: "admin",
      message: ""
    };

  }

  componentDidUpdate(prevProps) {
    if (this.props.loginRes !== prevProps.loginRes) {
      if (this.props.loginRes) {
        // đăng nhập thành công
      } else {
        console.log('đăng nhập thất bại')
        // đăng nhập thất bại
      }
    }
  }

  loginFunction() {
    this.props.dispatch(fetchLoginRequest({username: this.state.username, password: this.state.password}))
  }

  changeElement(event) {
    this.setState({[event.target.id]: event.target.value})
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>{RESOURCE[0].adminTitle}</h1>
                      <br/>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder={RESOURCE[0].username}
                               value={this.state.username}
                               id="username"
                               onChange={this.changeElement.bind(this)}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder={RESOURCE[0].password}
                               value={this.state.password} id="password"
                               onChange={this.changeElement.bind(this)}/>
                      </InputGroup>
                      <Row>
                        <Col xs="4">
                          <Button color="primary" className="px-4"
                                  onClick={this.loginFunction.bind(this)}>{RESOURCE[0].signIn}</Button>
                        </Col>
                        <Col xs="8" className="text-right">
                          <Link to={URL.FORGOT_PASSWORD} color="link"
                                className="px-0">{RESOURCE[0].forgotPassword}</Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loginRes = state.loginRes
  return {loginRes}
}

export default connect(mapStateToProps)(Login);
