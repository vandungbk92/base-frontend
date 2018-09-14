import React from 'react';
import ReactDOM from 'react-dom';
import Requests from './Requests';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Requests />, div);
  ReactDOM.unmountComponentAtNode(div);
});
