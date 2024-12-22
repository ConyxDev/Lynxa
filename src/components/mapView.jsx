import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = {
  lat: 46.2,
  lng: 6.1,
};

function MapView() {
    return (
        <LoadScript googleMapsApiKey="AIzaSyBrjSC_JYE7WmFbfaG5af0405yTM_mOqeY">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
            >
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    )
}

export default MapView;