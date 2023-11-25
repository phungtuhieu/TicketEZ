import React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { listIcon } from "~/assets/img";

import './mapbox.scss'
import { style } from '~/pages/Admin/Seat/SeatChart/SearChart.module.scss';

function Mapbox({latitude, longitude, address }) {
  const [showPopup, togglePopup] = React.useState(true);

  return (
    <Map
      initialViewState={{
        latitude: latitude,
        longitude: longitude,
        zoom: 16,
      }}
      style={{
        height: "70vh",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken="pk.eyJ1Ijoibmd1eWVudmFuaHV1dGFpIiwiYSI6ImNsbnU0N29jazBiemwyaW9kbGZyZnAxZjkifQ.C0_aqS6mFyHpXwUBBSLzqA"
      className="mapbox"
    >
        <div className="abc">â</div>
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={true}
          closeOnClick={true}
          onClose={() => togglePopup(false)}
          anchor="bottom"
          className="popup"
          style={{padding: 25}}
        >
          <div className="title">Lotte Phú Thọ</div>
          <div className="address">{address}</div>
        </Popup>
      )}
      <Marker
        latitude={latitude}
        longitude={longitude}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <img width={15} src={listIcon.markerPink} alt="" onClick={() => togglePopup(true)} />
      </Marker>
    </Map>
  );
}

export default Mapbox;
