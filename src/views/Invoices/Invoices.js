import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav, NavItem, NavLink, TabContent, TabPane, Form, FormGroup, Label, Input, CardFooter
} from 'reactstrap';

import {CONSTANTS} from "../../common/constants";
import {connect} from 'react-redux'
import classnames from 'classnames';
import Select from 'react-select'
import {fetchProductsRequest} from "../../epics-reducers/fetch/fetch-product.duck";

Array.prototype.sum = function (prop) {
  let total = 0
  for (let i = 0, _len = this.length; i < _len; i++) {
    total += parseInt(this[i][prop] ? this[i][prop] : 0)
  }
  return total
}

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 0,
      listProducts: [],
      listTab: [{tabId: 0, tabName: 'Đơn số ', tabData: {}}],
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchProductsRequest({
      data: {}, method: CONSTANTS.GET
    }))
  }

  componentDidUpdate(prevProps) {
    if (this.props.productsRes !== prevProps.productsRes) {
      let listProducts = []
      this.props.productsRes.data.map((item, index) => {
        listProducts[index] = item
        listProducts[index].value = item._id;
        listProducts[index].label = item.name;
      })
      this.setState({listProducts})
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  handleAddListTab() {
    let tabDataTemp = {
      tabId: (this.state.listTab[this.state.listTab.length - 1].tabId + 1),
      tabName: 'Đơn số ',
      tabData: {}
    }
    let listTabTemp = this.state.listTab
    listTabTemp.push(tabDataTemp)
    this.setState({listTab: listTabTemp, activeTab: listTabTemp[listTabTemp.length - 1].tabId})
  }

  handleRemoveListTab(tabId) {
    if (this.state.listTab.length === 1) return
    let lisTabTemp = this.state.listTab.filter((item, index) => {
      return item.tabId !== tabId
    })
    let activeTabTemp = tabId !== this.state.activeTab ? lisTabTemp.filter((item, index) => {
      return item.tabId === this.state.activeTab
    })[0].tabId : lisTabTemp[lisTabTemp.length - 1].tabId
    this.setState({listTab: lisTabTemp, activeTab: activeTabTemp})
  }

  handlePaymentOrders() {

  }

  handleElement(event, tabId) {
    this.state.listTab.map((item, index) => {
      if (item.tabId === tabId) {
        this.state.listTab[index].tabData[event.target.id] = event.target.value
        this.setState(this.state)
      }
    })
  }

  handleElementProduct(event, indexOnProduct, tabId) {
    this.state.listTab.map((item, index) => {
      if (item.tabId === tabId) {
        this.state.listTab[index].tabData.list_products[indexOnProduct][event.target.id] = event.target.value;
        let price = this.state.listTab[index].tabData.list_products[indexOnProduct].price
        let quantity = this.state.listTab[index].tabData.list_products[indexOnProduct].quantity
        this.state.listTab[index].tabData.list_products[indexOnProduct].total = price * quantity
        //let total_product = this.state.listTab[index].tabData.list_products.sum("quantity");
        //let total_bill = this.state.listTab[index].tabData.list_products.sum("total");
        //this.state.listTab[index].tabData.total_product = total_product
        //this.state.listTab[index].tabData.total_bill = total_bill
        this.setState(this.state)
      }
    })
  }

  getSum(total, num) {
    return total + num;
  }

  handleSelectChange(selected, tabId) {
    this.state.listTab.map((item, index) => {
      if (item.tabId === tabId) {
        this.state.listTab[index].tabData.list_products = selected;
        this.setState(this.state)
      }
    })
  }

  render() {
    //    let show_date = `${('0' + created_at.getDate()).slice(-2)}/${('0' + (created_at.getMonth() + 1)).slice(-2)}/${created_at.getFullYear()}`
    let Now = new Date();
    let name = `${('0' + Now.getDate()).slice(-2)}/${('0' + (Now.getMonth() + 1)).slice(-2)}/${Now.getFullYear()}`

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" className="mb-4">
            <Nav tabs>
              {this.state.listTab.length ? this.state.listTab.map((item, index) => {
                return <NavItem key={index}>
                  <NavLink
                    className={classnames({active: item.tabId === this.state.activeTab})}
                    onClick={() => {
                      this.toggle(item.tabId);
                    }}
                  >
                    <i className="icon-calculator"></i> <span> {item.tabName + item.tabId} </span> {'\u00A0'}
                  </NavLink>
                  <i className="icon-close" onClick={() => this.handleRemoveListTab(item.tabId)}></i>
                </NavItem>
              }) : null}
              <NavItem>
                <NavLink onClick={this.handleAddListTab.bind(this)}>
                  <i className="fa fa-plus"></i>{'\u00A0'}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {this.state.listTab.length ? this.state.listTab.map((item, index) => {
                let total_product = this.state.listTab[index].tabData.list_products ? this.state.listTab[0].tabData.list_products.sum("quantity") : 0;
                let total_bill = this.state.listTab[index].tabData.list_products ? this.state.listTab[index].tabData.list_products.sum("total") : 0;
                let revenue  = 0
                return <TabPane tabId={item.tabId} key={index}>
                  <Row>
                    <Col md={4} xs={12} className="no-padding">
                      <div>
                        <CardHeader>
                          <strong>Thông tin đơn hàng</strong>
                        </CardHeader>
                        <CardBody>
                          <Form action="" method="post" className="form-horizontal">
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="name">Tên đơn hàng</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="name" name="name"
                                       placeholder="Enter name..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.name || name}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="customer_name">Tên khách hàng</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="customer_name" name="customer_name"
                                       placeholder="Enter customer name..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.customer_name || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="address">Địa chỉ</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="address" name="address"
                                       placeholder="Enter address name..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.address || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="phone_number">Số điện thoại</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="phone_number" name="phone_number"
                                       placeholder="Enter phone number..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.phone_number || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="total_product">Số lượng sản phẩm</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="number" id="total_product" name="total_product"
                                       value={total_product || ''}
                                       disabled/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="total_bill">Tổng tiền hàng</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="total_bill" name="total_bill"
                                       value={total_bill || ''}
                                       disabled/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="cost">Chi phí</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="cost" name="cost"
                                       placeholder="Enter cost..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.cost || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="revenue">Doanh thu</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="revenue" name="revenue"
                                       value={revenue || ''}
                                       disabled/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="money_paid">Khách đã trả</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="money_paid" name="money_paid"
                                       placeholder="Enter money paid..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.money_paid || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="arrears">Khách còn nợ</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="arrears" name="arrears"
                                       value={item.tabData.arrears || ''}
                                       disabled/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="transport_unit">Đơn vị vận</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="transport_unit" name="transport_unit"
                                       placeholder="Enter transport unit..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.transport_unit || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="transport_code">Mã vận</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="transport_code" name="transport_code"
                                       placeholder="Enter transport code..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.transport_code || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="status_bill_id">Trạng thái đơn hàng</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="status_bill_id" name="status_bill_id"
                                       placeholder="Enter status bill..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.status_bill_id || ''}/>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col xs="12" md="4">
                                <Label htmlFor="description">Khác</Label>
                              </Col>
                              <Col xs="12" md="8">
                                <Input type="text" id="description" name="description"
                                       placeholder="Enter description..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.description || ''}/>
                              </Col>
                            </FormGroup>
                          </Form>
                        </CardBody>
                        <CardFooter>
                          <Button type="submit" size="sm" color="primary"
                                  onClick={() => this.handlePaymentOrders(item.tabId)}>
                            <i className="fa fa-dot-circle-o"></i> Thanh toán</Button>
                        </CardFooter>
                      </div>
                    </Col>
                    <Col md={8} xs={12}>
                      <CardHeader>
                        <strong>Thông tin sản phẩm</strong>
                      </CardHeader>
                      <CardBody>
                        <FormGroup row>
                          <Col xs="12" md="4">
                            <Label htmlFor="select_product">Chọn sản phẩm</Label>
                          </Col>
                          <Col xs="12" md="8">
                            <Select
                              value={item.tabData.list_products}
                              options={this.state.listProducts}
                              onChange={(selected) => this.handleSelectChange(selected, item.tabId)}
                              multi={true}
                              noResultsText={'No data'}
                              placeholder={'Select'}/>
                          </Col>
                        </FormGroup>
                        <Table responsive striped>
                          <thead>
                          <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá nhập</th>
                            <th>Tồn kho</th>
                            <th>Giá bán</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                          </tr>
                          </thead>
                          <tbody>
                          {item.tabData.list_products && item.tabData.list_products.length ? item.tabData.list_products.map((product, index) => {
                            return (
                              <tr key={index}>
                                <td>{product.code || ''}</td>
                                <td>{product.name || ''}</td>
                                <td>{product.import_price || ''}</td>
                                <td>{product.archive || ''}</td>
                                <td>
                                  <Input type="number" id="price" value={product.price || ''}
                                         onChange={(event) => this.handleElementProduct(event, index, item.tabId)}/>
                                </td>
                                {/*<Input type="text" id="name" name="name"
                                       placeholder="Enter name..."
                                       onChange={(event) => this.handleElement(event, item.tabId)}
                                       value={item.tabData.name || name}/>*/}
                                <td>
                                  <Input type="number" id="quantity" value={product.quantity || ''}
                                         onChange={(event) => this.handleElementProduct(event, index, item.tabId)}/>
                                </td>
                                <td>{product.total || ''}</td>
                              </tr>
                            )
                          }) : null
                          }
                          </tbody>
                        </Table>
                      </CardBody>
                    </Col>
                  </Row>
                </TabPane>
              }) : null}
            </TabContent>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const loginRes = state.loginRes
  const productsRes = state.productsRes
  return {loginRes, productsRes}
}


export default connect(mapStateToProps)(Invoices);
