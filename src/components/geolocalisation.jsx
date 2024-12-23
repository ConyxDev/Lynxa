import { useState, useRef } from "react";
import { GoogleMap, LoadScript, Circle, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const carougeCoords = {
  lat: 46.1826,
  lng: 6.1392,
};

const radius = 5000;

function Geolocalisation() {
  const [position, setPosition] = useState(carougeCoords);
  const [error, setError] = useState(null);
  const mapRef = useRef(null); // Référence pour accéder à la carte

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
    }
  };

  return (
    <div>
      <h1>Ma Position</h1>
      <button onClick={getPosition}>Obtenir ma position</button>
      <LoadScript googleMapsApiKey="AIzaSyBrjSC_JYE7WmFbfaG5af0405yTM_mOqeY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={13}
          onLoad={(map) => (mapRef.current = map)}
        >
          <Marker position={position} title="Votre position" />
          <Circle
            center={carougeCoords}
            radius={radius}
            options={{
              fillColor: "blue",
              fillOpacity: 0.2,
              strokeColor: "blue",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </LoadScript>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Geolocalisation;
