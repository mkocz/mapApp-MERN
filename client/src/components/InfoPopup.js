import React from 'react'
import PlaceSharpIcon from '@material-ui/icons/PlaceSharp';
import {  Popup } from 'react-map-gl';
import "./InfoPopup.css";


function InfoPopup(props) {

  function closePopup() {
    props.onClose()
  }

  return (
    <>
     <Popup latitude={53}
          longitude={0}
          closeButton={true}
          closeOnClick={true}
          anchor="left"
          onClose={closePopup}
          className="info"
        >
          <h4> <PlaceSharpIcon style={{ fontSize: 20, marginRight: 10}} />Dodaj Twoje ulubione miejsce! </h4>
          <span>Aby to zrobić, kliknij dwukrotnie w wybrany punkt na mapie.</span>
        </Popup>
    </>
  )
}

export default InfoPopup
