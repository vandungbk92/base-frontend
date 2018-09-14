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
  DropdownItem
} from 'reactstrap';

import {CONSTANTS} from "../../common/constants";
import {fetchProductsRequest, fetchProductRequest} from "../../epics-reducers/fetch/fetch-product.duck";
import {connect} from 'react-redux'
import ImportProduct from './ImportProduct/ImportProduct'
import queryString from 'query-string'

class Products extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
      isShowModal: false,
      saveAndContinue: false,
      products: [],
      page: 1,
      total: [1]
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.setState({page: parsed.page ? parsed.page : 1}, () => {
      this.getData()
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.productsRes !== prevProps.productsRes) {
      let productsTemp = []
      this.props.productsRes.data.map((item, index) => {
        productsTemp[index] = item
        productsTemp[index].checked = false;
      })
      /*this.props.history.push({
        pathname: `/product/products?page=${this.props.productsRes.page}`,
        //state: {page: this.props.productsRes.page}
      })*/
      /*self.props.history.push({
        pathname: url,
        state: {page: info.page}
      });*/
      this.setState({products: productsTemp, page: this.props.productsRes.page, total: this.props.productsRes.total})
    }
    if (this.props.productRes !== prevProps.productRes) {
      if (this.props.productRes.method === CONSTANTS.POST) {
        if (!this.state.saveAndContinue) {
          this.setState({isShowModal: false})
        }
      }
      if (this.props.productRes.method === CONSTANTS.GET) {

      }
    }
  }

  getData() {
    this.props.dispatch(fetchProductsRequest({
      data: {
        start: (this.state.page - 1) * CONSTANTS.ITEM_PER_PAGE,
        end: (this.state.page * CONSTANTS.ITEM_PER_PAGE)
      }, method: CONSTANTS.GET
    }))
  }

  handleCheckAll(event) {
    this.state.products.map((item, index) => {
      this.state.products[index].checked = event.target.checked
    })
    this.setState(this.state)
  }

  handleCheckedItem(event) {
    this.state.products.map((item, index) => {
      if (item._id === event.target.id) {
        this.state.products[index].checked = !this.state.products[index].checked
      }
    })
    this.setState(this.state)
  }

  handlePagination(value) {
    this.state.page = value;
    this.props.history.push({
      pathname: `/product/products?page=${value}`,
      //state: {page: this.props.productsRes.page}
    })
    this.getData()
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  handleBusiness(type) {
    alert('Chưa làm gì đâu')
  }

  handleProduct() {
    alert('Chưa làm gì đâu')
  }

  isShowModal() {
    this.setState({isShowModal: !this.state.isShowModal})
  }

  handleSaveData(data, type) {
    this.setState({saveAndContinue: (type === CONSTANTS.CONTINUE)})
    this.props.dispatch(fetchProductRequest({data: data, method: CONSTANTS.POST}))
  }

  render() {
    let hasItemChecked = !!this.state.products.filter(item => {
      return item.checked
    }).length
    return (
      <div className="animated fadeIn">
        <Row>
          <ImportProduct isShowModal={this.state.isShowModal}
                         handleShowModal={this.isShowModal.bind(this)}
                         handleSaveData={this.handleSaveData.bind(this)}/>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <i className="fa fa-align-justify"></i> <strong>Danh sách sản phẩm</strong>
                  </Col>
                  <Col md={6}>
                    <Button color="primary" size="sm" className="pull-right" onClick={this.isShowModal.bind(this)}>
                      <i className="fa fa-plus"></i>&nbsp;Thêm mới
                    </Button>
                    {hasItemChecked &&
                    <ButtonDropdown className="mr-1 pull-right" size="sm" isOpen={this.state.dropdownOpen[1]}
                                    toggle={() => {
                                      this.toggle(1);
                                    }}>
                      <DropdownToggle caret color="primary">Thao tác</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem color="primary" onClick={() => this.handleBusiness(CONSTANTS.DELETE)}>Ngừng kinh
                          doanh</DropdownItem>
                        <DropdownItem onClick={() => this.handleBusiness(CONSTANTS.RESTORE)}>Tiếp tục kinh
                          doanh</DropdownItem>
                        <DropdownItem onClick={() => this.handleProduct(CONSTANTS.DELETE)}>Xóa sản phẩm</DropdownItem>
                        <DropdownItem onClick={() => this.handleProduct(CONSTANTS.RESTORE)}>Khôi phục sản
                          phẩm</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>}
                  </Col>
                </Row>

              </CardHeader>
              <CardBody>
                <Table responsive striped>
                  <thead>
                  <tr>
                    <th><input type="checkbox" id="check_all" onClick={this.handleCheckAll.bind(this)}/></th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá bán</th>
                    <th>Giá vốn</th>
                    <th>Tồn kho</th>
                    <th>Trạng thái kinh doanh</th>
                    <th>Khác</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.products.length ? this.state.products.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th><input type="checkbox" id={item._id} checked={item.checked}
                                   onClick={this.handleCheckedItem.bind(this)}/></th>
                        <td>{item.code}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.import_price}</td>
                        <td>
                          <Badge color="success">{item.archive}</Badge>
                        </td>
                        <td>
                          <Badge
                            color={item.status ? "success" : "error"}>{item.status ? "Đang kinh doanh" : "Ngừng kinh doanh"}</Badge>
                        </td>
                        <td>
                          <Badge
                            color={item.is_delete ? "error" : "success"}>{item.is_delete ? "Sản phẩm đã xóa" : ""}</Badge>
                        </td>
                      </tr>
                    )
                  }) : null
                  }
                  </tbody>
                </Table>
                <Pagination>
                  {/*<PaginationItem disabled={this.state.page === 1}>
                    <PaginationLink previous tag="button" onClick={() => {
                      this.state.page = this.state.page - 1
                    }}>Prev</PaginationLink>
                  </PaginationItem>*/}
                  {this.state.total.map((item, index) => {
                    return (
                      <PaginationItem active={item === this.state.page} key={index}>
                        <PaginationLink tag="button"
                                        onClick={() => this.handlePagination(item)}>{item}</PaginationLink>
                      </PaginationItem>
                    )
                  })}
                  {/*<PaginationItem disabled={this.state.page === this.state.total.length}>
                    <PaginationLink next tag="button" onClick={() => {
                      this.state.page = this.state.page + 1
                    }}>Next</PaginationLink>
                  </PaginationItem>*/}
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const productsRes = state.productsRes
  const productRes = state.productRes
  const loginRes = state.loginRes
  return {loginRes, productsRes, productRes}
}


export default connect(mapStateToProps)(Products);
