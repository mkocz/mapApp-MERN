import React from 'react'
import './Header.css'

function Header(props) {

    function handleChange(event) {
        props.onChange(event.target.value);
    }

    return (
        <header>
            <div className="showPlaces">
                <h4>Zobacz miejsca polecane przez: </h4>
                <select onChange={handleChange}>
                    <option value="">wszyscy</option>
                    {props.users.map((user) => (
                        <option key={user} value={user}>{user}</option>))
                    }
                </select>
            </div>
            <div className="legend">
                {props.placeCategories.map((category) => (
                    <div key={category.name}><div className="color" style={{ backgroundColor: category.color }} />{category.name}</div>))
                }
            </div>
        </header>
    )
}

export default Header
