import React from 'react';
import ReactDOM from 'react-dom';
import ImportProduct from './ImportProduct';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ImportProduct/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
