import React from 'react';
import ReactDOM from 'react-dom';
import Units from './Units';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Units />, div);
  ReactDOM.unmountComponentAtNode(div);
});
