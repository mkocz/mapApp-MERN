import React from 'react'
import { Popup } from 'react-map-gl';
import "./NewPin.css";


function NewPin(props) {
    function handleSubmit(e) {
        props.handleSubmit(e);
    }

    function setNewPlace() {
        props.setNewPlace(null);
    }

    function setTitle(event) {
        props.setTitle(event.target.value);
    }

    function setDesc(event) {
        props.setDesc(event.target.value);
    }

    function setRating(event) {
        props.setRating(event.target.value);
    }

    function setCategoryIndex(event) {
        props.setCategoryIndex(event.target.value);
    }

    function setUsername(event) {
        props.setUsername(event.target.value);
    }

    return (
        <Popup
            latitude={props.newPlace.lat}
            longitude={props.newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="left"
            onClose={() => setNewPlace(null)}>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Nazwa</label>
                    <input required
                        placeholder="Wpisz nazwę" onChange={setTitle} />
                    <label>Opis</label>
                    <textarea required
                        placeholder="Opisz miejsce" onChange={setDesc} />
                    <label>Ocena</label>
                    <select required onChange={setRating} >
                        <option value="" ></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label>Kategoria</label>
                    <select required onChange={setCategoryIndex}>
                        <option value=""></option>
                        {props.placeCategories.map((cat, index) => (
                            <option value={index}>{cat.name}</option>
                        ))
                        }
                    </select>
                    <label>Dodaję jako</label>
                    <select required onChange={setUsername}>
                        <option value=""></option>
                        <option value="anonim">anonim</option>
                        {props.users.map((user) => (
                            <option value={user}>{user}</option>
                        ))
                        }
                    </select>
                    <button type="submit">Dodaj miejsce</button>
                </form>
            </div>
        </Popup>
    )
}

export default NewPin
