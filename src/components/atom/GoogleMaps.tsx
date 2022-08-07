import { envConfig } from '@src/core/config/envConfig';
import React from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

const defaultCenter = { lat: 37.52974, lng: 126.962721 };
const defaultOptions = { scrollwheel: false };

const RegularMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      {...props}
      defaultZoom={12}
      defaultCenter={defaultCenter}
      defaultOptions={defaultOptions}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
        gestureHandling: 'greedy',
      }}
    ></GoogleMap>
  ))
);

const loadingElementStyle = { height: '100%' };
const containerElementStyle = { height: '100%' };
const mapElementStyle = { height: '100%' };

export default function GoogleMaps() {
  return (
    <RegularMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${envConfig.googleMapKey}`}
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  );
}
