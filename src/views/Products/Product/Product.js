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

import {CONSTANTS} from "../../../common/constants";
import {fetchProductsRequest, fetchProductRequest} from "../../../epics-reducers/fetch/fetch-product.duck";
import {connect} from 'react-redux'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }


  render() {

    return (
      <div className="animated fadeIn">

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


export default connect(mapStateToProps)(Product);
