import React from 'react';
import ReactDOM from 'react-dom';
import Permission from './Permission';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Permission />, div);
  ReactDOM.unmountComponentAtNode(div);
});
