import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer';
//import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import MapMarker from '../MapMarker/MapMarker'

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var self = this;
    if (self.props.markers.length) {
      setTimeout(() => {
        const bounds = new window.google.maps.LatLngBounds();
        self.props.markers.map(marker => {
          const latLng = new window.google.maps.LatLng(marker.lat, marker.lng);
          bounds.extend(latLng);
        });
        self.refs.map.fitBounds(bounds);
      }, 100);
    }
  }

  render() {
    var self = this;
    return <GoogleMap
      ref='map'
      center={this.props.center}
      zoom={this.props.zoom}
      onIdle={this.props.onMapLoad}
    >
      <MarkerClusterer
        onClick={this.props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {this.props.markers && this.props.markers.map((marker, i) => {
          this.props.openArr.push(false);
          return <MapMarker
            key={i}
            marker={marker}
          >
          </MapMarker>
        })}
      </MarkerClusterer>
    </GoogleMap>
  }
}

export default (Map)