import * as React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import MainLayout from '../Layout/mainLayout'
import EmptyLayout from '../Layout/emptyLayout'
import {COMMON_APP} from '../../common/common_app'
import {CONSTANTS} from '../../common/constants'
import {RESOURCE} from '../../common/resource'
import {API} from '../../common/api'
import {fetchLoginSuccess} from "../../epics-reducers/fetch/fetch-login.duck";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.loginRes.user && COMMON_APP.getCookie(CONSTANTS._USER_LOGIN_)) {
      this.props.dispatch(fetchLoginSuccess(JSON.parse(COMMON_APP.getCookie(CONSTANTS._USER_LOGIN_))))
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loginRes !== prevProps.loginRes && this.props.loginRes) {
      COMMON_APP.setCookie(CONSTANTS._USER_LOGIN_, JSON.stringify(this.props.loginRes))
    }
  }

  render() {
    let Layout = COMMON_APP.checkCookie(COMMON_APP.getCookie(CONSTANTS._USER_LOGIN_)) ? <MainLayout/> : <EmptyLayout/>
    return (
      <Router>
        {Layout}
      </Router>
    )

  }
}

function mapStateToProps(state) {
  const loginRes = state.loginRes
  const logoutRes = state.logoutRes
  return {loginRes, logoutRes}
}

export default connect(mapStateToProps)(Main);
