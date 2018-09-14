import React, {Component} from 'react';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink} from 'reactstrap';
import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import avatar from '../../assets/img/avatars/6.jpg'
import {COMMON_APP} from "../../common/common_app";
import {CONSTANTS} from "../../common/constants";
import {URL} from "../../common/url";
import {RESOURCE} from "../../common/resource";
import {fetchLogoutRequest} from "../../epics-reducers/fetch/fetch-logout.duck";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

class DefaultHeader extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {
    if (this.props.notify !== prevProps.notify) {
      /*if(this.props.notify.success){
        switch (this.props.notify.method) {
          case 'get':
            //alert('Thành công')
            break;
          case 'post':
            alert('Thêm mới thành công')
            break;
          case 'put':
            alert('Cập nhật thành công')
            break;
          case 'delete':
            alert('Xóa thành công')
            break;
          default:
            return
        }
      }
      else{
        switch (this.props.notify.method) {
          case 'get':
            alert('Có lỗi vui lòng kiểm tra lại hoặc báo cáo quản trị viên')
            break;
          case 'post':
            alert('Thêm mới thất bại')
            break;
          case 'put':
            alert('Cập nhật thất bại')
            break;
          case 'delete':
            alert('Xóa thất bại')
            break;
          default:
            return
        }
      }*/
    }
    if (this.props.wait !== prevProps.wait) {
      console.log('wait', this.props.wait)
    }
  }

  handleLogout() {
    //let loginRes = JSON.parse(COMMON_APP.getCookie(CONSTANTS._USER_LOGIN_))
    //this.props.dispatch(fetchLogoutRequest({username: loginRes.user.username}))
  }

  redirect(url) {
    if (this.props.history.location.pathname === url) return
    this.props.history.push(url)
  }

  render() {
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile/>
        <AppNavbarBrand
          //full={{src: logo, width: 30, height: 30, alt: 'CFS'}}
          //minimized={{src: logo, width: 30, height: 30, alt: 'CFS'}}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg"/>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to={URL.REQUESTS}>{RESOURCE[0].managerRequest}</Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-envelope"></i><Badge pill color="danger">10</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              {`${this.props.usersInfo.firstName}${' '}${this.props.usersInfo.lastName}`}
              <img src={avatar} className="img-avatar" alt="admin@bootstrapmaster.com"/>
            </DropdownToggle>
            <DropdownMenu right style={{right: 'auto'}}>
              <DropdownItem onClick={() => this.redirect(URL.PROFILE)}> <i
                className="icon-user"></i>{RESOURCE[0].profile}</DropdownItem>
              <DropdownItem onClick={this.handleLogout.bind(this)}><i className="icon-logout"></i> {RESOURCE[0].signOut}
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

//DefaultHeader.propTypes = propTypes;
//DefaultHeader.defaultProps = defaultProps;

function mapStateToProps(state) {
  const loginRes = state.loginRes
  const notify = state.notify
  const wait = state.wait
  return {loginRes, notify, wait}
}

export default connect(mapStateToProps)(DefaultHeader);
