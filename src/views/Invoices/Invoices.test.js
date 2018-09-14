import React from 'react';
import ReactDOM from 'react-dom';
import Invoices from './Invoices';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Invoices/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
