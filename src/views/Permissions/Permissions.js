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
import {URL} from "../../common/url";

class Permissions extends Component {
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
        Quản lý nhóm quyền
      </div>
    )
  }
}

export default Permissions;
