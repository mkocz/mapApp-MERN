import axios from "axios";
import { WebMercatorViewport } from 'react-map-gl';


const goToBoundedView = ([lat1, long1], [lat2, long2], viewport) => {

    const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
        .fitBounds([[lat1, long1], [lat2, long2]], {
            padding: 150,
        });
    return ({
        ...viewport,
        longitude,
        latitude,
        zoom,
    });
};

const getCoordinates = async (filtername) => {
    try {
        const coordinates = await axios.get(`api/pins/coordinates?username=${filtername}`);
        return (coordinates.data)
    } catch (err) {
        console.log(err);
    }
};

const adjustViewtoUsersPins = async (filtername, viewport) => {
    try {
        const coord = await getCoordinates(filtername);
        const north = Math.floor(coord[0][1]);
        const south = Math.floor(coord[0][0]);
        const east = Math.floor(coord[1][1]);
        const west = Math.floor(coord[1][0]);
        const newViewport = goToBoundedView([west, south], [east, north], viewport);
        return newViewport
    }
    catch (err) {
        console.log(err);
    }
}


export default adjustViewtoUsersPins