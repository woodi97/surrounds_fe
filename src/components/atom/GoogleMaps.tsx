import { RoomInfo } from '@src/core/types/chatroom'
import React from 'react'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { envConfig } from '@src/core/config/envConfig'

const defaultCenter = { lat: 37.52974, lng: 126.962721 }
const defaultOptions = { scrollwheel: false }

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
    >
      {Centers?.map((info, idx) => {
        const { latitude, longitude } = info.location
        return <Marker key={`marker-${idx}`} position={{ lat: latitude, lng: longitude }}></Marker>
      })}
    </GoogleMap>
  ))
)

const Centers: RoomInfo[] = []
const loadingElementStyle = { height: '100%' }
const containerElementStyle = { height: '100%' }
const mapElementStyle = { height: '100%' }

export default function GoogleMaps() {
  return (
    <RegularMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${envConfig.googleMapKey}`}
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  )
}
