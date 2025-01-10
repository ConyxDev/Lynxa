import { useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import PostalZones from "../components/postalZones";

const MapDisplay = () => {
    const mapRef = useRef(null);

    const mapContainerStyle = {
        width: "100%",
        height: "680px",
    };

    const defaultCenter = {
        lat: 46.2044, // Latitude de Genève
        lng: 6.1432, // Longitude de Genève
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={defaultCenter}
                    zoom={11}
                    onLoad={(map) => (mapRef.current = map)}
                >
                <PostalZones map={mapRef.current}/>
                </GoogleMap>     
        </div>
    );
};

export default MapDisplay;