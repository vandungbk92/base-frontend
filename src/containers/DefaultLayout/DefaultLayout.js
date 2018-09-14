import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../_nav';
// routes config
import routes from '../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import {testAsync} from "../../epics-reducers/serivces/userServices";
import {connect} from 'react-redux'
import {fetchUsersInfoRequest} from "../../epics-reducers/fetch/fetch-users-info.duck";

class DefaultLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {_navigation: null, usersInfo: null}
  }

  componentWillMount() {

  }

  /*componentDidMount() {
    let {dispatch} = this.props
    dispatch(fetchUsersInfoRequest())
  }

  async componentDidUpdate(prevProps) {
    let {usersInfoRes} = this.props
    if (usersInfoRes !== prevProps.usersInfoRes) {
      let _navigation = this.getNavigation(usersInfoRes.menu)
      let _usersInfo = this.getUsersInfo(usersInfoRes.info)
      this.setState({_navigation: _navigation, usersInfo: _usersInfo})
    }
  }*/

  getNavigation(usersInfoMenu) {
    let _navigation = {items: []}
    usersInfoMenu.map((item, index) => {
      let menu = {
        name: item.name,
        url: item.link,
        icon: 'icon-speedometer'
      }
      _navigation.items.push(menu)
    })
    return _navigation
  }

  getUsersInfo(usersInfo) {
    let _usersInfo = usersInfo
    return _usersInfo
  }

  render() {
    let _navigation = {
      items: [
        {
          name: 'Quản lý danh mục',
          url: '/category',
          icon: 'icon-cursor',
          children: [
            {
              name: 'Nhân viên',
              url: '/users',
              icon: 'icon-cursor',
            },
            {
              name: 'Nhóm',
              url: '/groups',
              icon: 'icon-cursor',
            }
          ]
        }
      ]
    }
    return (
      <div className="app">
        <AppHeader fixed>
          {this.state.usersInfo ? <DefaultHeader history={this.props.history} usersInfo={this.state.usersInfo}/> : null}
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>

            <AppSidebarForm/>

            <AppSidebarNav navConfig={_navigation} {...this.props} />
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container>
              <Switch>
                {routes.map((route, idx) => {
                    return <Route key={idx} path={route.path} exact={route.exact} name={route.name}
                                  render={props => ( <route.component {...props} /> )}/>
                  },
                )}
                {/*<Redirect from="/" to="/dashboard"/>*/}
              </Switch>
            </Container>
          </main>
        </div>
        <AppFooter>
          <DefaultFooter/>
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const usersInfoRes = state.usersInfoRes
  return {usersInfoRes}
}

export default connect(mapStateToProps)(DefaultLayout);
