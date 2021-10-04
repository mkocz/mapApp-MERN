import React from 'react'
import PlaceSharpIcon from '@material-ui/icons/PlaceSharp';
import GradeSharpIcon from '@material-ui/icons/GradeSharp';
import { Marker, Popup } from 'react-map-gl';
import "./PinPopup.css";


function PinPopup(props) {

  function handleClick() {
    props.onClick(props.pin._id, props.pin.lat, props.pin.long)
  }

  function handleClose() {
    props.onClose(null)
  }

  return (
    <>
      <Marker
        latitude={props.pin.lat}
        longitude={props.pin.long}
        offsetLeft={-3.5 * props.viewport.zoom}
        offsetTop={-7 * props.viewport.zoom}
      >
        <PlaceSharpIcon style={{ fontSize: props.viewport.zoom * 7, color: props.pin.pincolor, cursor: "pointer" }}
          onClick={handleClick}
        />
      </Marker>
      {props.pin._id === props.currentPlaceId && (<Popup
        latitude={props.pin.lat}
        longitude={props.pin.long}
        closeButton={true}
        closeOnClick={false}
        anchor="left"
        onClose={handleClose} >

        <div className="popup">
          <label>Miejsce</label>
          <div className="place">{props.pin.title}</div>
          <label>Opis</label>
          <div className="desc">{props.pin.desc}</div>
          <label>Ocena</label>
          <div className="rating">
            {Array(props.pin.rating).fill(<GradeSharpIcon />)}
          </div>
          <span className="username">utworzone przez <span>{props.pin.username}</span></span>
        </div>
      </Popup>)}
    </>
  )
}

export default PinPopup
