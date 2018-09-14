import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from "react-google-maps";
import {MarkerClusterer} from 'react-google-maps/lib/components/addons/MarkerClusterer';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgSet: ['#da3839', '#ff5607', '#36b631'],
      isOpen: false
    }
  }

  onToggleOpen() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    var icon = require('./images/1x1.png');
    return <MarkerWithLabel
      position={{lat: this.props.marker.lat, lng: this.props.marker.lng}}
      labelAnchor={new google.maps.Point(10, 10)}
      labelStyle={{
        backgroundColor: this.state.bgSet[this.props.marker.stateId - 1],
        width: "20px",
        height: "20px",
        border: "1px solid #000",
        borderRadius: "100%"
      }}
      icon={icon}
      onClick={this.onToggleOpen.bind(this)}>
      <div>
        {this.state.isOpen &&
        <InfoWindow
          position={{lat: this.props.marker.lat, lng: this.props.marker.lng}}
          onCloseClick={this.onToggleOpen.bind(this)}
        >
          <div className="infowindow">
            <h3>{this.props.marker.title}</h3>
            <p>{this.props.marker.address}</p>
            <div className={`status status-${this.props.marker.stateId}`}>{this.props.marker.stateName}</div>
          </div>
        </InfoWindow>}
      </div>
    </MarkerWithLabel>
  }
}

export default (MapMarker)