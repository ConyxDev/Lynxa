import { GoogleMap, Polygon } from "@react-google-maps/api";

const PolygonMapView = () => {
    // Coordonnées d'un exemple de polygone (remplacez-les par les coordonnées de votre code postal)
    const polygonCoords = [
        { lat: 46.2333, lng: 6.1167 },
        { lat: 46.2400, lng: 6.1200 },
        { lat: 46.2350, lng: 6.1300 },
        { lat: 46.2300, lng: 6.1250 },
        { lat: 46.2333, lng: 6.1167 }, // Fermeture du polygone
    ];

    const polygonOptions = {
        fillColor: "rgba(0, 153, 204, 0.35)", // Couleur de remplissage
        fillOpacity: 0.4, // Opacité
        strokeColor: "#0099cc", // Couleur des bordures
        strokeOpacity: 0.8, // Opacité des bordures
        strokeWeight: 2, // Épaisseur des bordures
    };

    return (
        <div className="googleMap w-full h-[735px]">
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={{ lat: 46.2333, lng: 6.1167 }} // Point central de la carte
                    zoom={14}
                >
                    {/* Polygone pour le secteur du code postal */}
                    <Polygon
                        paths={polygonCoords} // Coordonnées du polygone
                        options={polygonOptions} // Options de style
                    />
                </GoogleMap>
        </div>
    );
};

export default PolygonMapView;