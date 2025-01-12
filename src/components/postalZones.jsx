import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const PostalZones = ({ map }) => {
    const postalZones = useMemo(() => [
        {
            postalCode: "1218",
            locality: "Grand-Saconnex",
            coordinates: [
                [6.132456056, 46.23095329],
                [6.121929833, 46.23495264],
            ],
        },
        {
            postalCode: "1255",
            locality: "Veyrier",
            coordinates: [
                [6.174404251, 46.16770821],
            ],
        },
        {
            postalCode: "1212",
            locality: "Lancy",
            coordinates: [
                [6.1280, 46.1892],
                [6.1350, 46.1900],
                [6.1400, 46.1850],
                [6.1250, 46.1820],
                [6.1280, 46.1892],
            ],
        },
    ], []);

    useEffect(() => {
        if (!map) return;

        const polygons = [];

        postalZones.forEach((zone) => {
            const polygon = new window.google.maps.Polygon({
                paths: zone.coordinates.map(([lng, lat]) => ({ lat, lng })),
                strokeColor: "#0099cc",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "rgba(0, 153, 204, 0.35)",
                fillOpacity: 0.5,
            });

            polygon.setMap(map);
            polygons.push(polygon);
        });

        return () => {
            polygons.forEach(polygon => polygon.setMap(null));
        };
    }, [map, postalZones]);

    return null;
};

PostalZones.propTypes = {
    map: PropTypes.object.isRequired,
};

export default PostalZones;