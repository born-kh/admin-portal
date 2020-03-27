import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class GoogleMap extends React.Component {
  render() {
    return (
      <LeafletMap
        animate
        attributionControl
        center={this.props.position}
        doubleClickZoom
        dragging
        easeLinearity={0.35}
        maxZoom={10}
        scrollWheelZoom
        zoom={6}
        zoomControl
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={this.props.position}>
          <Popup>Popup for any custom information.</Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default GoogleMap;
