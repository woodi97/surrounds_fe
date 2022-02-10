import React, { useState, useEffect } from 'react'
import router from 'next/router'
// import MapBox
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl'
// import modules
import classNames from 'classnames'
// import stylesheet
import styles from './Map.module.scss'
// import interface
import { Location, RoomInfo } from '@src/core/interface'
interface IMapProps {
  className: string
  location: Location
  chatrooms?: RoomInfo[]
}

export default function Map(props: IMapProps): JSX.Element {
  const { className, location, chatrooms } = props
  const isClient = typeof window === 'object'
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo>(null)
  const [viewPort, setViewPort] = useState({
    ...getSize(),
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 13,
  })

  // get size of current window
  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  // add resize event listener to window
  // to get the event when resize
  useEffect(() => {
    if (!isClient) {
      return
    }
    function handleResize() {
      setViewPort({
        ...viewPort,
        ...getSize(),
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // return JSX
  return (
    <div className={classNames(className, styles.Mapbox)}>
      <ReactMapGL
        {...viewPort}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        transitionInterpolator={new FlyToInterpolator()}
        onViewportChange={(viewport) => setViewPort(viewport)}
      >
        {/* <div className={styles.navi_control}>
					<NavigationControl />
				</div> */}
        {chatrooms.map((room, idx) => (
          <Marker key={idx} latitude={room.location.latitude} longitude={room.location.longitude}>
            <button className={styles.btn_marker} onClick={() => setSelectedRoom(room)}>
              <img src="/profiles/default.png" alt="img" />
            </button>
          </Marker>
        ))}
        {selectedRoom && (
          <Popup
            offsetLeft={25}
            latitude={selectedRoom.location.latitude}
            longitude={selectedRoom.location.longitude}
            onClose={() => setSelectedRoom(null)}
          >
            <div className={styles.chatroom_popup}>
              <div className={styles.chatroom_popup_info}>
                <div className={styles.chatroom_popup_title}>{selectedRoom.title}</div>
                <div className={styles.chatroom_popup_generator}>
                  by {selectedRoom.generator.username}
                </div>
              </div>
              <div className={styles.chatroom_popup_buttons}>
                <div className={styles.chatroom_popup_button_enter}>
                  <img
                    onClick={() => router.push('/', `/chatroom/${selectedRoom.id}`)}
                    src="/images/icon_enter.svg"
                  />
                </div>
              </div>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  )
}
