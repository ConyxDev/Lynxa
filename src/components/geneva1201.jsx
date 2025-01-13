import { useEffect, useState } from 'react';
import proj4 from 'proj4';
import { Polygon } from '@react-google-maps/api';

const Geneva1201 = () => {
    const [paths, setPaths] = useState([]);
    
    // Définition des systèmes de coordonnées
    const MN95 = "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs";
    const WGS84 = "+proj=longlat +datum=WGS84 +no_defs";

    const polygonOptions = {
        fillColor: "#0099cc",
        fillOpacity: 0.35,
        strokeColor: "#0099cc",
        strokeOpacity: 1,
        strokeWeight: 2
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger le fichier JSON
                const zipData = await import('../asset/AMTOVZ_ZIP.json');
                
                // Trouver la zone 1201
                const zone1201 = zipData.default.features.find(
                    feature => feature.properties.ZIP4 === "1201"
                );

                if (zone1201 && zone1201.geometry.coordinates[0]) {
                    // Convertir les coordonnées
                    const convertedCoords = zone1201.geometry.coordinates[0].map(coord => {
                        const [lng, lat] = proj4(MN95, WGS84, [coord[0], coord[1]]);
                        return { lat, lng };
                    });

                    setPaths(convertedCoords);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };

        loadData();
    }, []);

    if (paths.length === 0) return null;

    return (
        <Polygon
            paths={paths}
            options={polygonOptions}
            onClick={() => console.log('Zone 1201 cliquée')}
        />
    );
};

export default Geneva1201;