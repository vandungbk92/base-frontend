import React from 'react';
import ReactDOM from 'react-dom';
import MapWithMarkerClusterer from './MapWithMarkerClusterer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapWithMarkerClusterer/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
