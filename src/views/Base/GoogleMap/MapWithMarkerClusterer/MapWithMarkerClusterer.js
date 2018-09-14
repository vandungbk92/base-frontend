import React, {Component} from 'react';
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table
} from 'reactstrap';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
//import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
//import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import {compose, withProps, withHandlers, withStateHandlers} from 'recompose';
import {CONSTANTS} from '../../../../common/constants';
import Map from '../Map/Map'
//import MapMarker from '../MapMarker/MapMarker'

const MapWithMarkerClusterer = compose(
  withProps({
    googleMapURL: CONSTANTS.GOOGLE_MAPS_URL + 'key=' + CONSTANTS.GOOGLE_API_KEY,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div className="map-wrapper" style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
    },
  }),
  withStateHandlers(() => ({
    openArr: [],
    isOpen: false
  }), {
    onToggleOpen: ({isOpen}) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <Map {...props} />
);

export {MapWithMarkerClusterer};