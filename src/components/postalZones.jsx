import React, { useEffect } from "react";

const PostalZones = ({ map }) => {
    // Données GeoJSON statiques pour les zones
    const geoJsonData = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                properties: { postalCode: "1218" },
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [6.1167, 46.2333],
                            [6.1200, 46.2400],
                            [6.1300, 46.2350],
                            [6.1250, 46.2300],
                            [6.1167, 46.2333],
                        ],
                    ],
                },
            },
            {
                type: "Feature",
                properties: { postalCode: "1255" },
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [6.1850, 46.1668],
                            [6.1900, 46.1700],
                            [6.1950, 46.1650],
                            [6.1800, 46.1600],
                            [6.1850, 46.1668],
                        ],
                    ],
                },
            },
            {
                type: "Feature",
                properties: { postalCode: "1212" },
                geometry: {
                    type: "Polygon",
                    coordinates: [
                        [
                            [6.1280, 46.1892],
                            [6.1350, 46.1900],
                            [6.1400, 46.1850],
                            [6.1250, 46.1820],
                            [6.1280, 46.1892],
                        ],
                    ],
                },
            },
        ],
    };

    useEffect(() => {
        if (!map) return;

        // Ajouter les données GeoJSON à la carte
        map.data.addGeoJson(geoJsonData);

        // Appliquer le style aux zones
        map.data.setStyle({
            fillColor: "rgba(0, 153, 204, 0.35)", // Couleur de remplissage
            strokeColor: "#0099cc", // Couleur des bordures
            strokeWeight: 2, // Épaisseur des bordures
            fillOpacity: 0.5, // Opacité des zones
        });
    }, [map]);

    return null; // Pas de rendu visuel
};

export default PostalZones;