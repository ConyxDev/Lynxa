import { useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
/* import PostalZones from "./postalZones";
import GenevaPostalCodes from "./fetchData"; */
import Geneva1201 from "./geneva1201";

const MapDisplay = () => {
    const mapRef = useRef(null);

    const mapContainerStyle = {
        width: "100%",
        height: "680px",
    };

    const mapOptions = {
        mapTypeId: 'terrain',
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
    };

    const defaultCenter = {
        lat: 46.2044, // Latitude de Genève
        lng: 6.1432, // Longitude de Genève
    };

    const onLoad = (map) => {
        mapRef.current = map;
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={defaultCenter}
                    zoom={11}
                    onLoad={onLoad}
                    options={mapOptions}
                >
{/*                 <PostalZones map={mapRef.current}/>
                <GenevaPostalCodes/> */}
                <Geneva1201/>
                </GoogleMap>     
        </div>
    );
};

export default MapDisplay;