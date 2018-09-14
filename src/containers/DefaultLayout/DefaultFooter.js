import React, {Component} from 'react';
import {ScrollToTopButton} from '../../views/Base';
class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <ScrollToTopButton scrollStepInPx="50" delayInMs="16.66"/>

        <div className="pull-right hidden-xs">
          <b>Version</b> 1.0
        </div>
        <strong>&nbsp; Copyright © 2017-2018 Thinklabs. &nbsp;</strong> All rights reserved.
      </React.Fragment>
    );
  }
}

//DefaultFooter.propTypes = propTypes;
//DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
