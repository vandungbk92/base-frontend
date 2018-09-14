import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
  CardFooter,
  FormText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn, ClearSearchButton} from 'react-bootstrap-table';
import {connect} from 'react-redux'
import {RESOURCE} from "../../common/resource";
import {URL} from "../../common/url";
import CreateUser from './CreateUser/CreateUser'
import {_Pagination, Loading} from '../Base'
import queryString from 'query-string'
import {getListUsers} from "../../epics-reducers/serivces/userServices";
import {FRM_CODE} from "../../common/frmCode";
import {getFormPermission, checkFormPermission} from "../../epics-reducers/serivces/formPermissionServices";
import {isEmpty} from "../../epics-reducers/serivces/common";
import Page404 from "../Page404/Page404";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: true,
      isShowCreateUser: false,
      pageActive: 1,
      listUsers: null,
      total: null,
      show404: null
    }
  }

  async componentWillMount() {
    let formPems, checkFormPems;
    if (!isEmpty(this.props.usersFormPermissionRes)) { // check usersFormPermissionRes đã lưu trước đó
      checkFormPems = checkFormPermission(this.props.usersFormPermissionRes[FRM_CODE.frmDemo])
    } else {
      formPems = await getFormPermission(FRM_CODE.frmDemo, this.props.dispatch)
      checkFormPems = checkFormPermission(formPems)
    }
    if (checkFormPems) {// có quyền đăng nhập form
      const parsed = queryString.parse(this.props.location.search);
      let pageActive = parseInt(parsed.page ? parsed.page : 1)
      let listUsers = await getListUsers(pageActive)
      this.setState({
        listUsers: listUsers.docs,
        pageActive: parseInt(parsed.page ? parsed.page : 1),
        total: listUsers.pages,
        show404: false
      })
    } else {// không có quyền đăng nhập form
      this.setState({show404: true})
      return;
    }
    //console.log('0 componentWillMount')
    //this.props.dispatch(fetchUsersFormPermissionRequest({frmCode: FRM_CODE.frmDemo}))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  async componentDidMount() {
    /*const parsed = queryString.parse(this.props.location.search);
    let pageActive = parseInt(parsed.page ? parsed.page : 1)
    let listUsers = await getListUsers(pageActive * 10)
    this.setState({listUsers: listUsers.data, pageActive: parseInt(parsed.page ? parsed.page : 1)})*/
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const parsed = queryString.parse(this.props.location.search);
      let pageActive = parseInt(parsed.page ? parsed.page : 1)
      let listUsers = await getListUsers(pageActive)
      this.setState({
        listUsers: listUsers.docs,
        pageActive: parseInt(parsed.page ? parsed.page : 1),
        total: listUsers.pages
      })
    }
  }

  redirect(url) {
    if (this.props.history.location.pathname === url) return
    this.props.history.push(url)
  }

  toggleAccordion() {
    this.setState({accordion: !this.state.accordion,});
  }

  createCustomClearButton = (onClick) => {
    return (
      <span>
        <button className='btn btn-danger btn-sm' onClick={onClick}><i className="fa fa-ban"></i> Hủy</button>
      </span>
    )
  }

  handleClearButtonClick = (onClick) => {
    onClick();
  }

  handleAction(cell, row) {
    return (
      <span>
        <i className="icon-pencil icon-action" onClick={() => {
          this.props.history.push(URL.USERS + '/edit/' + row._id)
        }}></i> &nbsp;
        <i className="icon-trash icon-action" onClick={() => {
          alert('xóa')
        }}></i>
      </span>
    )
  }

  handleShowCreateUser() {
    this.setState({isShowCreateUser: !this.state.isShowCreateUser})
  }

  /*handleCreateUser() {
    this.setState({isShowCreateUser: !this.state.isShowCreateUser})
  }*/

  getDataPerPage(value) {
    let url = URL.USERS_PAGE.format(value)
    if (this.props.history.location.pathname === url) return
    this.props.history.push(url)
  }

  render() {
    if (this.state.show404 === true) {
      return <Page404/>
    }
    if (this.state.show404 === null)
      return <Loading/> // làm 1 cái component loading
    // else
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton
    };
    return (
      <div className="animated fadeIn">
        {/*<CreateUser isShowModal={this.state.isShowCreateUser}
                    handleShowModal={this.handleShowCreateUser.bind(this)}
                    //handleSaveData={this.handleCreateUser.bind(this)}
        />*/}
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader id="headingOne">
                <Button block color="transparent" className="text-left m-0 p-0" onClick={() => this.toggleAccordion()}
                        aria-expanded={this.state.accordion} aria-controls="collapseOne">
                  {this.state.accordion ? <i className="fa fa-caret-up"></i> :
                    <i className="fa fa-caret-down"></i>}&nbsp;
                  <strong className="m-0 p-0">{RESOURCE[0].searchCondition}</strong>
                </Button>
              </CardHeader>
              <Collapse isOpen={this.state.accordion} data-parent="#accordion" id="collapseOne"
                        aria-labelledby="headingOne">
                <CardBody>
                  <Form action="" className="form-horizontal">
                    <FormGroup row>
                      <Col md="1">
                        <Label htmlFor="unit">{RESOURCE[0].unit}</Label>
                      </Col>
                      <Col md="3">
                        <select className="form-control">
                          <option>Đơn vị số 1</option>
                          <option>Đơn vị số 2</option>
                          <option>Đơn vị số 3</option>
                          <option>Đơn vị số 4</option>
                          <option>Đơn vị số 5</option>
                        </select>
                      </Col>
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
                      <Col md="1">
                        <Label htmlFor="status">{RESOURCE[0].status}</Label>
                      </Col>
                      <Col md="3">
                        <select className="form-control">
                          <option>Tất cả</option>
                          <option>Đang hoạt động</option>
                          <option>Ngưng hoạt động</option>
                        </select>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" className="pull-right"><i
                    className="fa fa-check-circle"></i>&nbsp;{RESOURCE[0].apply}</Button>&nbsp;
                  <Button type="reset" size="sm" color="danger" className="pull-right margin-right-10"><i
                    className="fa fa-ban"></i>&nbsp; {RESOURCE[0].cancelButton}</Button>&nbsp;
                </CardFooter>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> <strong>{RESOURCE[0].listUser} &nbsp;</strong>
                <Button size="sm" color="primary" onClick={this.handleShowCreateUser.bind(this)} className="pull-right"><i
                  className="fa fa-plus"></i>&nbsp; {RESOURCE[0].buttonAddNew}</Button>
              </CardHeader>
              <CardBody>
                {this.state.listUsers && <BootstrapTable
                  data={this.state.listUsers}
                  options={options}>
                  <TableHeaderColumn dataField='_id' dataSort={true} isKey={true}>_id</TableHeaderColumn>
                  <TableHeaderColumn dataField='firstName'>firstName</TableHeaderColumn>
                  <TableHeaderColumn dataField='lastName'>lastName</TableHeaderColumn>
                  <TableHeaderColumn dataField='email'>email</TableHeaderColumn>
                  <TableHeaderColumn dataField='role'>role</TableHeaderColumn>
                  <TableHeaderColumn dataField='_id'
                                     dataFormat={this.handleAction.bind(this)}>action</TableHeaderColumn>
                </BootstrapTable>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const usersFormPermissionRes = state.usersFormPermissionRes
  return {usersFormPermissionRes}
}

export default connect(mapStateToProps)(Users);
