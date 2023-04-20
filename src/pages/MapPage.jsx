import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker, Popup, GeolocateControl, NavigationControl, } from "react-map-gl";
// import PlaceIcon from "@mui/icons-material/Place";
import axios from "axios";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useParams } from "react-router-dom";

const token =
  "pk.eyJ1IjoidG9rYWdpNzQyOCIsImEiOiJjbDVuaHN0aTUxM3FtM2RsdmNnZ3RzbmppIn0.8j30FRZvMi9xXyMquHVBOA";

function MapPage() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const location = useLocation()
  const state = location.state
  // console.log({ location, state })

  const [viewport, setViewport] = useState({
    longitude: state?.long ?? 100.53651121438577,
    latitude: state?.lat ?? 13.730163580250164,
    zoom: state?.zoom ?? 10,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/farm`);
        // console.log("data : ", res.data.data)
        setPins(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, [pins]);

  const handleClick = (id, lat, long, z) => {
    setCurrentPlaceId(id);
    setViewport({ latitude: lat, longitude: long, zoom: z });
    // console.log(viewport);
  };
  const handleAddClick = (e) => {
    // console.log(e);
    const { lng, lat } = e.lngLat;
    alert(`${lng} and ${lat}`)
  };

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     setViewport({
  //       ...viewport,
  //       latitude: pos.coords.latitude,
  //       longitude: pos.coords.longitude,
  //       zoom: 3.5
  //     })
  //   })
  // }, [])

  return (
    <div className=" transition-transform">
      <Helmet>
        <title>แผนที่</title>
      </Helmet>
      <ReactMapGL
        // zoom={viewport.zoom}
        onZoom={(e) => setViewport({ zoom: e.viewState.zoom })}
        {...viewport}
        // onMove={(e) => setViewport({ zoom: e.viewState.zoom, latitude: e.viewState.latitude, longitude: e.viewState.longitude })}
        initialViewState={{
          longitude: state?.long ?? viewport.longitude,
          latitude: state?.lat ?? viewport.latitude,
          zoom: state?.zoom ?? viewport.zoom,
        }}
        mapboxAccessToken={token}
        style={{ width: "100%", height: "100vh", position: 'relative' }}
        className=" transition-transform"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onGeolocate={(e) => alert(`lat : ${e.coords.latitude} and long : ${e.coords.longitude}`)}
        />
        <NavigationControl position="top-right" />
        <div className="map-link-back">
          <h1 onClick={() => history.back()} style={{ cursor: "pointer" }}>Back</h1>
        </div>
        {pins.map((p) => (
          <div key={p._id}>
            <Marker longitude={p.long} latitude={p.lat} anchor="bottom"  >
              <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleClick(p._id, p.lat, p.long, 13.5)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10" style={{
                cursor: "pointer",
                color: "tomato",

              }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>

            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card-map">
                  <img src={`${p.image}`} height={100} className="w-full" />
                  <div className="flex items-center">
                    <p>ชื่อ</p>
                    <Link to={`/farm/${p._id}`} className="mt-1 ml-3 text-emerald-500">{p.name}</Link>
                  </div>
                  <label>address</label>
                  <span className="date">{p.address}</span>
                </div>
              </Popup>
            )}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default MapPage;
