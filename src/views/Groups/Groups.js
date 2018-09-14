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
import {CONSTANTS} from "../../common/constants";
import CreateGroup from './CreateGroup/CreateGroup'
import {_Pagination} from '../Base'
import queryString from 'query-string'
import {getListGroups, createGroup} from "../../epics-reducers/serivces/groupServices";
import {FRM_CODE} from "../../common/frmCode";
import {getFormPermission, checkFormPermission} from "../../epics-reducers/serivces/formPermissionServices";
import {isEmpty} from "../../epics-reducers/serivces/common";
import Page404 from "../Page404/Page404";

class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCreateGroup: false,
      pageActive: 1,
      listGroups: null,
      total: null,
      show404: null
    }
  }

  async componentWillMount() {
    let formPems, checkFormPems = true;
    if (checkFormPems) {// có quyền đăng nhập form
      const parsed = queryString.parse(this.props.location.search);
      let pageActive = parseInt(parsed.page ? parsed.page : 1)
      let listGroups = await getListGroups(pageActive)
      this.setState({
        listGroups: listGroups.docs,
        pageActive: parseInt(parsed.page ? parsed.page : 1),
        total: listGroups.pages,
        show404: false
      })
    } else {// không có quyền đăng nhập form
      this.setState({show404: true})
      return;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  async componentDidMount() {
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const parsed = queryString.parse(this.props.location.search);
      let pageActive = parseInt(parsed.page ? parsed.page : 1)
      let listGroups = await getListGroups(pageActive)
      this.setState({
        listGroups: listGroups.docs,
        pageActive: parseInt(parsed.page ? parsed.page : 1),
        total: listGroups.pages
      })
    }
  }

  redirect(url) {
    if (this.props.history.location.pathname === url) return$
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
          this.props.history.push(URL.GROUP_ID.format(row.id))
        }}></i> &nbsp;
        <i className="icon-trash icon-action" onClick={() => {
          alert('xóa')
        }}></i>
      </span>
    )
  }

  handleShowCreateGroup() {
    this.setState({isShowCreateGroup: !this.state.isShowCreateGroup})
  }

  getDataPerPage(value) {
    let url = URL.GROUP_PAGE.format(value)
    if (this.props.history.location.pathname === url) return
    this.props.history.push(url)
  }

  render() {
    /*if (this.state.show404 === true) {
      return <Page404/>
    }
    if (this.state.show404 === null)
      return <Loading/> // làm 1 cái component loading
    */
    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton
    };

    return (
      <div className="animated fadeIn">
        <CreateGroup isShowModal={this.state.isShowCreateGroup}
                     handleShowModal={this.handleShowCreateGroup.bind(this)}
        />
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> <strong>{RESOURCE[0].listGroup} &nbsp;</strong>
                <Button size="sm" color="primary" onClick={this.handleShowCreateGroup.bind(this)}
                        className="pull-right"><i
                  className="fa fa-plus"></i>&nbsp; {RESOURCE[0].buttonAddNew}</Button>
              </CardHeader>
              <CardBody>
                <BootstrapTable
                  data={this.state.listGroups}
                  options={options}
                  search>
                  <TableHeaderColumn dataField='_id' dataSort={true} isKey={true}>_id</TableHeaderColumn>
                  <TableHeaderColumn dataField='code'>code</TableHeaderColumn>
                  <TableHeaderColumn dataField='name'>name</TableHeaderColumn>
                  <TableHeaderColumn dataField='description'>description</TableHeaderColumn>
                  <TableHeaderColumn dataField='_id'
                                     dataFormat={this.handleAction.bind(this)}>action</TableHeaderColumn>
                </BootstrapTable>
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

export default connect(mapStateToProps)(Groups);
