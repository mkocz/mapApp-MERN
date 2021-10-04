import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import axios from 'axios';
import adjustViewtoUsersPins from './helpers/Helpers';
import PinPopup from './components/PinPopup';
import NewPin from './components/NewPin';
import Header from './components/Header';
import { placeCategories } from './data';
import InfoPopup from './components/InfoPopup';
import "./App.css";

function App() {
  const [filtername, setFiltername] = useState('');
  const [pins, setPins] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [username, setUsername] = useState('');
  const [popupVisibility, setPopupVisibility] = useState(true);
  const [viewport, setViewport] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight * 0.9,
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  const getPins = async () => {
    try {
      const allPins = await axios.get("api/pins");
      setPins(allPins.data);
      console.log(allPins)
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      const allUsers = await axios.get("api/pins/users");
      setUsers(allUsers.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPinsByUser = async () => {
    try {
      const allPins = await axios.get(`api/pins/username?username=${filtername}`);
      setPins(allPins.data);
    } catch (err) {
      console.log(err);
    }
  };

  const setViewForUser = async (filtername, viewport) => {
    try {
      const vp = await adjustViewtoUsersPins(filtername, viewport)
      setViewport(vp);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long, zoom: 6 })
    console.log(currentPlaceId)
  }

  const closePinPopup = () => {
    setCurrentPlaceId(null);
    setViewForUser(filtername, viewport);
  }

  const closeInfoPopup = () => {
    setPopupVisibility(false)
  }

  const handleAddPin = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
      pincolor: placeCategories[categoryIndex].color
    };

    try {
      const res = await axios.post("api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }

    setViewForUser(filtername, viewport);
  };

  useEffect(() => {
    console.log("start app")
    getPins();
    getUsers();
  }, []);

  useEffect(() => {
    getPinsByUser();
    setViewForUser(filtername, viewport);
  }, [filtername]);


  return (
    <div className="container">
      <Header users={users} placeCategories={placeCategories} onChange={setFiltername} />
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mkocz/cktmvpzsx2aql17r2p0rsrh8m"
        onDblClick={handleAddPin}
        transitionDuration="500"
      >
        {popupVisibility && <InfoPopup onClose={closeInfoPopup} />}
        {pins.map((pin) => (
          <div key={pin._id}>
            <PinPopup pin={pin} viewport={viewport} currentPlaceId={currentPlaceId} onClose={closePinPopup}
              onClick={handleMarkerClick} />
            {newPlace && <NewPin
              newPlace={newPlace} placeCategories={placeCategories} users={users} handleSubmit={handleSubmit}
              setNewPlace={setNewPlace} setTitle={setTitle} setDesc={setDesc} setRating={setRating} setCategoryIndex={setCategoryIndex} setUsername={setUsername} />
            }
          </div>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default App