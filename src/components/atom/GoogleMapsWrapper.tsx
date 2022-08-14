import { UserProfile } from '@src/components/atom/index';
import { envConfig } from '@src/core/config/envConfig';
import { RoomInfoType } from '@src/core/types/chatroom';
import GoogleMapReact from 'google-map-react';
import React, { FunctionComponent } from 'react';

const defaultCenter = { lat: 37.52974, lng: 126.962721 };

const AnyReactComponent = ({ lat, lng, text }) => (
  <div className="w-8 h-8 bg-primary-500 rounded-full">
    <UserProfile username={text} />
  </div>
);

// if you want to use this, please set width and height explicitly
const GoogleMapsWrapper: FunctionComponent<{
  chatRooms: RoomInfoType[];
}> = ({ chatRooms }) => {
  const handleApiLoaded = (map, maps) => {
    console.log('Todo');
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: envConfig.googleMapKey }}
        defaultCenter={defaultCenter}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {chatRooms &&
          chatRooms.map((chatRoom) => (
            <AnyReactComponent
              key={chatRoom.id}
              lat={chatRoom.latitude}
              lng={chatRoom.longitude}
              text={chatRoom.author}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMapsWrapper;
