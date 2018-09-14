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

import {GoogleMapsComponent} from './GoogleMapsComponent/GoogleMapsComponent'
import {MapWithMarkerClusterer} from './MapWithMarkerClusterer/MapWithMarkerClusterer'

class GoogleMap extends Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {

  }

  onToggleOpen() {

  }

  geocodeLatLng(obj) {
    this.props.geocodeLatLng({lat: obj.latLng.lat(), lng: obj.latLng.lng()})
  }

  render() {

    return (
      this.props.mapType === 'MARKER' ?
        <MapWithMarkerClusterer
          center={this.props.mapCenter}
          zoom={this.props.zoom}
          apiKey={this.props.googleMapsAPIKey}
          markers={this.props.markers}/> :
        <GoogleMapsComponent
          isMarkerShown
          draggable={this.props.draggable}
          center={this.props.mapCenter}
          zoom={this.props.zoom}
          apiKey={this.props.googleMapsAPIKey}
          markerChanged={this.props.markerChanged}
          onMapLoad={this.props.onMapLoad}
          onClick={(obj) => this.geocodeLatLng(obj)}
        />
    );
  }
}

export default (GoogleMap)