import * as React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {withRouter} from 'react-router';
import Login from '../Login/Login';
import Register from '../Register'
import ForgotPassword from '../ForgotPassword'

class EmptyLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {}
    }
  }

  render() {
    return (
      <div className="wrapper full-page">
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/forgot-password' component={ForgotPassword}/>
          <Route exact path='/register' component={Register}/>
          <Redirect from="*" to="/"/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(EmptyLayout);
