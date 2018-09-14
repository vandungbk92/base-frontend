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
//import Map from '../Map/Map'
//import MapMarker from '../MapMarker/MapMarker'

const GoogleMapsComponent = compose(
  withProps({
    googleMapURL: CONSTANTS.GOOGLE_MAPS_URL + 'key=' + CONSTANTS.GOOGLE_API_KEY,
    loadingElement: <div style={{height: `100%`}}/>,
    containerElement: <div className="map-wrapper" style={{height: `400px`}}/>,
    mapElement: <div style={{height: `100%`}}/>,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    center={props.center}
    zoom={props.zoom}
    onIdle={props.onMapLoad}
    onClick={props.onClick}
  >
    {props.isMarkerShown
    && <Marker position={props.center} icon={props.icon} draggable={props.draggable || false}
               onDragEnd={props.markerChanged}/>}
  </GoogleMap>
);

export {GoogleMapsComponent};