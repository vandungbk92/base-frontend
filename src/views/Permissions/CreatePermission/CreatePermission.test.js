import React from 'react';
import ReactDOM from 'react-dom';
import CreatePermission from './CreatePermission';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreatePermission />, div);
  ReactDOM.unmountComponentAtNode(div);
});
