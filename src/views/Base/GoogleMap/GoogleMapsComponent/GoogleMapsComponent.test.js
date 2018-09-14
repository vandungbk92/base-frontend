import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapsComponent from './GoogleMapsComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GoogleMapsComponent/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
