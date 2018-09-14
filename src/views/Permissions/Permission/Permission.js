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
import {RESOURCE} from "../../../common/resource";
import {URL} from "../../../common/url";

class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }


  render() {
    return (
      <div className="animated fadeIn">
        Thông tin chi tiết
      </div>
    )
  }
}

export default Permission;
