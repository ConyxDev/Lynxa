import { GoogleMap, LoadScript, Circle} from "@react-google-maps/api";
import { useState } from "react";


function MapComponent() {
    const [defaultRadius, setDefaultRadius] = useState(5000);
    const [center, setCenter] = useState({
        lat: 46.2044,
        lng: 6.1432,
    });

    return (
        <div className="googleMap w-full h-[735px]">
            <LoadScript googleMapsApiKey="AIzaSyBrjSC_JYE7WmFbfaG5af0405yTM_mOqeY">
                <GoogleMap
                    mapContainerStyle={{width: "100%", height: "100%"}}
                    center={center}
                    zoom={13}
                >
                    <Circle
                    center={center} 
                    radius={defaultRadius}
                    options={{
                        strokeColor: "#000000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#007BFF",
                        fillOpacity: 0.2,
                    }}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapComponent;


