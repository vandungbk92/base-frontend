import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import classnames from 'classnames';
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone';
import {fetchProfileRequest} from "../../epics-reducers/fetch/fetch-profile.duck";
import {fetchLoginSuccess} from "../../epics-reducers/fetch/fetch-login.duck";
import {CONSTANTS} from "../../common/constants";
import {RESOURCE} from "../../common/resource";
import {_FormGroup} from '../Base'

const iconUpload = require('../../assets/img/upload-icon.svg')

class Profile extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this)
    this.state = {
      userProfile: {},
      activeTab: '1',
    };
  }

  componentDidMount() {
    let {clientHeight, clientWidth} = this.refs.Dropzone;
  }

  componentDidUpdate(prevProps) {

  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleElement(id, value) {
    this.state.userProfile[id] = value;
    this.setState(this.state)
  }

  handleUpdateProfile() {
    //this.props.dispatch(fetchProfileRequest({data: this.state.userProfile, method: CONSTANTS.PUT}))
  }

  onDrop(files) {
    this.state.userProfile.avatar = files[0].preview
    this.state.file = files[0]
    this.setState(this.state);
    /*this.setState({
      file: files[0],
      srcPreview: files[0].preview,
      changed: true,
      changeImg: true,
      isFirst: false
    });*/
  }

  handleGoBack(e) {
    e.preventDefault()
    window.history.back()
  }

  render() {
    let listNav = [{id: '1', title: RESOURCE[0].profile}, {id: '2', title: RESOURCE[0].changePassword}]
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>
                <strong>{RESOURCE[0].profileDetail}</strong>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  {listNav.map((item, index) => {
                    return (
                      <NavItem key={index}>
                        <NavLink
                          className={classnames({active: this.state.activeTab === item.id})}
                          onClick={() => {
                            this.toggle(item.id);
                          }}
                        >
                          {item.title}
                        </NavLink>
                      </NavItem>
                    )
                  })}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col xs="12" md="6">
                        <Form action="" method="" className="form-horizontal was-validated">
                          <_FormGroup md="3" label={RESOURCE[0].username}
                                      type="text"
                                      id="username"
                                      disabled={true}
                                      required={false}
                                      onChange={this.handleElement.bind(this)}
                                      value={this.state.userProfile.username || 'admin'}/>
                          <_FormGroup md="3" label={RESOURCE[0].fullName}
                                      type="text"
                                      id="full_name"
                                      plageholder=""
                                      onChange={this.handleElement.bind(this)}
                                      disabled={false}
                                      required={true}
                                      value={this.state.userProfile.full_name || ''}/>
                          <_FormGroup md="3" label={RESOURCE[0].mobilePhone}
                                      type="number"
                                      id="phone_number"
                                      plageholder=""
                                      onChange={this.handleElement.bind(this)}
                                      disabled={false}
                                      required={false}
                                      value={this.state.userProfile.phone_number || ''}/>
                          <_FormGroup md="3" label={RESOURCE[0].email}
                                      type="email"
                                      id="email"
                                      onChange={this.handleElement.bind(this)}
                                      disabled={false}
                                      required={true}
                                      value={this.state.userProfile.email || ''}/>
                          <_FormGroup md="3" label={RESOURCE[0].address}
                                      type="text"
                                      id="address"
                                      disabled={false}
                                      required={false}
                                      onChange={this.handleElement.bind(this)}
                                      value={this.state.userProfile.address || ''}/>
                          <_FormGroup md="3" label={RESOURCE[0].birthDay}
                                      type="date"
                                      id="birth_day"
                                      onChange={this.handleElement.bind(this)}
                                      disabled={false}
                                      required={false}
                                      value={this.state.userProfile.birth_day || ''}/>
                          <_FormGroup md="3" label={RESOURCE[0].unit}
                                      type="text"
                                      id="unit"
                                      onChange={this.handleElement.bind(this)}
                                      disabled={true}
                                      required={false}
                                      value={this.state.userProfile.unit || ''}/>
                        </Form>
                      </Col>
                      <Col xs="12" md="6">
                        <Dropzone onDrop={this.onDrop.bind(this)}
                                  ref="Dropzone"
                                  accept="image/*"
                                  className="dropzone"
                                  multiple={false}>
                          {!this.state.userProfile.avatar &&
                          <div>
                            <img src={iconUpload} className="upload-avatar"/>
                            <br/>
                            <h3>{RESOURCE[0].chooseImage}</h3>
                          </div>}
                          {this.state.userProfile.avatar && <img src={this.state.userProfile.avatar} className="profile-avatar"/>}
                        </Dropzone>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col xs="12" md="6">
                        <Form action="" method="" className="form-horizontal was-validated">
                          <_FormGroup md="3" label={RESOURCE[0].oldPassword}
                                      type="password"
                                      id="current_password"
                                      disabled={false}
                                      required={false}
                                      onChange={this.handleElement.bind(this)}
                                      value={this.state.userProfile.current_password || ''}/>
                          <_FormGroup md="3" label={RESOURCE[0].newPassword}
                                      type="password"
                                      id="new_password"
                                      onChange={this.handleElement.bind(this)}
                                      disabled={false}
                                      required={false}
                                      value={this.state.userProfile.new_password || ''}/>
                          <_FormGroup md="3" label={RESOURCE[0].reNewPassword}
                                      type="password"
                                      id="re_new_password"
                                      onChange={this.handleElement.bind(this)}
                                      disabled={false}
                                      required={false}
                                      value={this.state.userProfile.re_new_password || ''}/>
                        </Form>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
              <CardFooter>
                <Button type="button" size="sm" color="primary" className="pull-right"
                        onClick={this.handleUpdateProfile.bind(this)}><i
                  className="fa fa-check-circle"></i> {RESOURCE[0].updateButton}</Button>
                <Button type="button" size="sm" color="danger" className="pull-right margin-right-10"
                        onClick={this.handleGoBack.bind(this)}><i
                  className="fa fa-arrow-circle-left"></i> {RESOURCE[0].backButton}</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const loginRes = state.loginRes
  const profileRes = state.profileRes
  return {loginRes, profileRes}
}


export default connect(mapStateToProps)(Profile);
