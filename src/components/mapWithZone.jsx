import { GoogleMap, LoadScript, Circle } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = {
  lat: 46.2,
  lng: 6.1,
};

// Rayon de la zone approximative en mètres
const radius = 10000; // 10 km

function MapWithZone() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBrjSC_JYE7WmFbfaG5af0405yTM_mOqeY">
      <GoogleMap 
        className="h-[800px]"
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        {/* Cercle représentant une zone approximative */}
        <Circle
          center={center}
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
  );
}

export default MapWithZone;