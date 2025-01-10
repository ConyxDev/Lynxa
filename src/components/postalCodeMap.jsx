import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const PostalCodeMap = ({ postalCode }) => {
    const [geoData, setGeoData] = useState(null);

    // Récupérer les données GeoJSON pour un code postal spécifique
    useEffect(() => {
        const fetchGeoData = async () => {
            const url = `https://geocat.ch/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typeName=ch.swisstopo-vd.ortschaftenverzeichnis_plz&outputFormat=application/json&CQL_FILTER=plz='${postalCode}'`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement des données");
                }
                const data = await response.json();
                setGeoData(data);
                console.log(data);
            } catch (error) {
                console.error("Erreur :", error);
            }
        };

        fetchGeoData();
    }, [postalCode]);

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <MapContainer center={[46.8182, 8.2275]} zoom={8} style={{ height: "100%", width: "100%" }}>
                {/* Tuiles de la carte (OpenStreetMap) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Affichage des données GeoJSON */}
                {geoData && <GeoJSON data={geoData} />}
            </MapContainer>
        </div>
    );
};

export default PostalCodeMap;