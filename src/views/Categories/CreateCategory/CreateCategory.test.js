import React from 'react';
import ReactDOM from 'react-dom';
import CreateUser from './CreateUser';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateUser/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
