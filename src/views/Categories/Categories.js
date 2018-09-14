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
  DropdownItem
} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn, ClearSearchButton} from 'react-bootstrap-table';
import {RESOURCE} from "../../common/resource";
import requestData from './RequestsData'

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Người dùng số ' + id,
      phone: '0123456789',
      description: 2100 + i,
      status: i % 2 === 0 ? 'Đang hoạt động' : 'Ngưng hoạt động'
    });
  }
}

addProducts(70);

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [true, false, false],
      dropdownOpen: new Array(6).fill(false),
      isShowCreateUser: false
    }
  }

  redirect(url) {
    if (this.props.history.location.pathname === url) return
    this.props.history.push(url)
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  createCustomClearButton = (onClick) => {
    return (
      <span>
        <button className='btn btn-danger btn-sm' onClick={onClick}><i className="fa fa-ban"></i> Hủy</button>
        {/*<button className='btn btn-danger btn-sm' onClick={onClick}><i className="fa fa-ban"></i> Hủy</button>*/}
      </span>
    )
    /*return (
      <ClearSearchButton
        btnText='Hủy'
        btnContextual='btn-danger'
        className='btn btn-primary btn-sm'
        onClick={e => this.handleClearButtonClick(onClick)}/>
    );*/
    // If you want have more power to custom the child of ClearSearchButton,
    // you can do it like following
    // return (
    //   <ClearSearchButton
    //     btnContextual='btn-warning'
    //     className='my-custom-class'
    //     onClick={ () => this.handleClearButtonClick(onClick) }>
    //     { ... }
    //   </ClearSearchButton>
    // );
  }
  handleClearButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    onClick();
  }

  handleAction(cell, row) {
    return (
      <span>
        <i className="icon-pencil icon-action" onClick={() => {
          this.props.history.push(`users/${row.id}`)
        }}></i> &nbsp;
        <i className="icon-trash icon-action" onClick={() => {
          alert('xóa')
        }}></i>
      </span>
    )
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  handleShowCreateUser() {
    this.setState({isShowCreateUser: !this.state.isShowCreateUser})
  }

  handleCreateUser() {
    this.setState({isShowCreateUser: !this.state.isShowCreateUser})
  }

  render() {

    const userList = usersData.filter((user) => user.id < 10)
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton
    };
    /*const footerData = [
      [
        {
          label: 'Total',
          columnIndex: 0
        },
        {
          label: 'Total value',
          columnIndex: 2,
          align: 'right',
          formatter: (tableData) => {
            let label = 0;
            for (let i = 0, tableDataLen = tableData.length; i < tableDataLen; i++) {
              label += tableData[i].price;
            }
            return (
              <strong>{label}</strong>
            );
          }
        }
      ]
    ];*/
    return (
      <div className="animated fadeIn">
        <CreateUser isShowModal={this.state.isShowCreateUser}
                    handleShowModal={this.handleShowCreateUser.bind(this)}
                    handleSaveData={this.handleCreateUser.bind(this)}/>
        {/* <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <strong>Horizontal</strong> Form
              </CardHeader>
              <CardBody>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-email">Email</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="hf-email" name="hf-email" placeholder="Enter Email..."
                             autoComplete="email"/>
                      <FormText className="help-block">Please enter your email</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="hf-password">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="hf-password" name="hf-password" placeholder="Enter Password..."
                             autoComplete="current-password"/>
                      <FormText className="help-block">Please enter your password</FormText>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary" className="pull-right"><i
                  className="fa fa-dot-circle-o"></i>Submit</Button>&nbsp;
                <Button type="reset" size="sm" color="danger" className="pull-right"><i
                  className="fa fa-ban"></i>Reset</Button>&nbsp;
              </CardFooter>
            </Card>
          </Col>
        </Row>*/}
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader id="headingOne">
                <Button block color="transparent" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)}
                        aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                  {this.state.accordion[0] ? <i className="fa fa-caret-up"></i> :
                    <i className="fa fa-caret-down"></i>}&nbsp;
                  <strong className="m-0 p-0">{RESOURCE[0].searchCondition}</strong>
                </Button>
              </CardHeader>
              <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne"
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
                        {/*<Input type="test" id="unit" name="unit"/>*/}
                        {/*<Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {
                          this.toggle(0);
                        }}>
                          <DropdownToggle caret>
                            Dropdown
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>Header</DropdownItem>
                            <DropdownItem>Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                            <DropdownItem>Another Action</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>*/}
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

                        {/*<Input type="status" id="status" name="status"/>*/}
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary" className="pull-right"><i
                    className="fa fa-dot-circle-o"></i>&nbsp;{RESOURCE[0].apply}</Button>&nbsp;
                  <Button type="reset" size="sm" color="danger" className="pull-right margin-right-10"><i
                    className="fa fa-ban"></i>&nbsp; Hủy</Button>&nbsp;
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
                <BootstrapTable
                  data={products}
                  //footerData={footerData}
                  options={options}
                  pagination
                  search>
                  <TableHeaderColumn dataField='id' dataSort={true} isKey={true}>ID</TableHeaderColumn>
                  <TableHeaderColumn dataField='name'>Tên</TableHeaderColumn>
                  <TableHeaderColumn dataField='phone'>SĐT</TableHeaderColumn>
                  <TableHeaderColumn dataField='description'>Khác</TableHeaderColumn>
                  <TableHeaderColumn dataField='status'>Trạng thái</TableHeaderColumn>
                  <TableHeaderColumn dataField='id' dataFormat={this.handleAction.bind(this)}>Action</TableHeaderColumn>
                </BootstrapTable>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> <strong>Users &nbsp;</strong>
                <small className="text-muted">example</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">registered</th>
                    <th scope="col">role</th>
                    <th scope="col">status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {userList.map((user, index) => {
                      const userLink = `/users/${user.id}`
                      const getBadge = (status) => {
                        return status === 'Active' ? 'success' :
                          status === 'Inactive' ? 'secondary' :
                            status === 'Pending' ? 'warning' :
                              status === 'Banned' ? 'danger' :
                                'primary'
                      }

                      return (
                        <tr key={user.id.toString()} onClick={() => this.redirect(userLink)}>
                          <th scope="row">{user.id}</th>
                          <td>{user.name}</td>
                          <td>{user.registered}</td>
                          <td>{user.role}</td>
                          <td><Badge color={getBadge(user.status)}>{user.status}</Badge></td>
                        </tr>
                      )
                    }
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
