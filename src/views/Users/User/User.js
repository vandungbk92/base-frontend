import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Badge,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button
} from 'reactstrap';
import classnames from 'classnames';
import {RESOURCE} from "../../../common/resource";

class User extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleGoBack(e) {
    e.preventDefault()
    window.history.back()
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <strong><i className="icon-user pr-1"></i>Lê Đình Lương</strong>
              </CardHeader>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '1'})}
                      onClick={() => {
                        this.toggle('1');
                      }}
                    >
                      <i className="icon-user"></i> {'\u00A0'} Thông tin
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '2'})}
                      onClick={() => {
                        this.toggle('2');
                      }}
                    >
                      <i className="icon-wrench"></i>{'\u00A0'} Phân quyền
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({active: this.state.activeTab === '3'})}
                      onClick={() => {
                        this.toggle('3');
                      }}
                    >
                      <i className="icon-options"></i>{'\u00A0'} Khác
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                      <Row>
                        <Col md="4">
                          <FormGroup row>
                            <Col md="3">
                              <Label>Tên đăng nhập</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <p className="form-control-static">Username</p>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Tên người dùng</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="text" id="text-input" value="Lê Đình Lương" name="text-input"
                                     placeholder="Text"/>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">Điện thoại</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="text" id="text-input" value="0868609536" name="text-input"
                                     placeholder="Text"/>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label htmlFor="text-input">ngày sinh</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="date" id="text-input" value="Lê Đình Lương" name="text-input"
                                     placeholder="Text"/>
                            </Col>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup row>
                            <Col md="3">
                              <Label>Email</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="email" id="text-input" name="text-input" placeholder="email"/> </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col md="3">
                              <Label>Đơn vị</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="text" id="text-input" name="text-input" placeholder="đơn vị"/> </Col>
                          </FormGroup>
                        </Col>
                        <Col md="4">
                          <FormGroup row>
                            <Col xs="12">
                              <Input type="textarea" id="text-input" name="text-input" placeholder="Khác" rows="10"/>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12">
                          <Button type="submit" size="sm" color="danger" className="pull-right"><i
                            className="icon-trash"></i>&nbsp;{RESOURCE[0].deleteButton}</Button>
                          <Button type="submit" size="sm" color="danger" className="pull-right margin-right-10"><i
                            className="icon-lock"></i>&nbsp;{RESOURCE[0].stopButton}</Button>
                          <Button type="submit" size="sm" color="primary" className="pull-right margin-right-10"><i
                            className="fa fa-check-circle"></i>&nbsp;{RESOURCE[0].updateButton}</Button>
                          <Button type="button" size="sm" color="danger" className="pull-right margin-right-10"
                                  onClick={this.handleGoBack.bind(this)}><i
                            className="fa fa-arrow-circle-left"></i>&nbsp;{RESOURCE[0].backButton}</Button>
                        </Col>
                      </Row>
                    </Form>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col md="1">
                        <Label htmlFor="role">{RESOURCE[0].role}</Label>
                      </Col>
                      <Col md="3">
                        <select className="form-control">
                          <option>Quản lý</option>
                          <option>Nhân viên</option>
                          <option>Vai trò 1</option>
                          <option>Vai trò 2</option>
                          <option>Vai trò 3</option>
                        </select>
                        {/*<Input type="role" id="role" name="role"/>*/}
                      </Col>
                      <Col md="8">
                        <i className="pull-right icon-trash icon-action"></i>
                        <i className="pull-right fa fa-plus icon-action margin-right-10"></i>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col xs="12">
                        <FormGroup row>
                          <Col md="2"><Label>Hệ thống</Label></Col>
                          <Col md="2">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"
                                     value="option1"/>
                              <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2"
                                     value="option2"/>
                              <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3"
                                     value="option3"/>
                              <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                            </FormGroup>
                          </Col>

                          <Col md="2"><Label>Người dùng</Label></Col>
                          <Col md="2">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"
                                     value="option1"/>
                              <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2"
                                     value="option2"/>
                              <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3"
                                     value="option3"/>
                              <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                            </FormGroup>
                          </Col>

                          <Col md="2"><Label>Đơn vị</Label></Col>
                          <Col md="2">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"
                                     value="option1"/>
                              <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2"
                                     value="option2"/>
                              <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3"
                                     value="option3"/>
                              <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md="2"><Label>Chủ đề</Label></Col>
                          <Col md="2">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"
                                     value="option1"/>
                              <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2"
                                     value="option2"/>
                              <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3"
                                     value="option3"/>
                              <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                            </FormGroup>
                          </Col>

                          <Col md="2"><Label>Dịch vụ</Label></Col>
                          <Col md="2">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"
                                     value="option1"/>
                              <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2"
                                     value="option2"/>
                              <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3"
                                     value="option3"/>
                              <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                            </FormGroup>
                          </Col>

                          <Col md="2"><Label>FAQs</Label></Col>
                          <Col md="2">
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1"
                                     value="option1"/>
                              <Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2"
                                     value="option2"/>
                              <Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>
                            </FormGroup>
                            <FormGroup check className="checkbox">
                              <Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3"
                                     value="option3"/>
                              <Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>
                            </FormGroup>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <Button type="button" size="sm" color="danger" className="pull-right"><i
                          className="fa fa-ban"></i>&nbsp;{RESOURCE[0].cancelButton}</Button>&nbsp;
                        <Button type="button" size="sm" color="primary" className="pull-right margin-right-10"><i
                          className="fa fa-check-circle"></i>&nbsp;{RESOURCE[0].updateButton}</Button>
                        <Button type="button" size="sm" color="danger" className="pull-right margin-right-10"
                                onClick={this.handleGoBack.bind(this)}><i
                          className="fa fa-arrow-circle-left"></i>&nbsp;{RESOURCE[0].backButton}</Button>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    Lịch sử hoạt động
                    <Button type="button" size="sm" color="danger" className="pull-right margin-right-10"
                            onClick={this.handleGoBack.bind(this)}><i
                      className="fa fa-arrow-circle-left"></i>&nbsp;{RESOURCE[0].backButton}</Button>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default User;
