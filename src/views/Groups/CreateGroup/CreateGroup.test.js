import React from 'react';
import ReactDOM from 'react-dom';
import CreateGroup from './CreateGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateGroup/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
