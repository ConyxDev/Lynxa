// utils/geometryUtils.js

/**
 * Calcule le centroïde d'un polygone
 * @param {Array} coordinates - Tableau des coordonnées [{lat, lng}, ...]
 * @returns {Object} - Centroïde sous forme { lat: number, lng: number }
 */
export const calculateCentroid = (coordinates) => {
    let centroid = { lat: 0, lng: 0 };
    let signedArea = 0;
    let x0 = 0; // Longitude du point courant
    let y0 = 0; // Latitude du point courant
    let x1 = 0; // Longitude du point suivant
    let y1 = 0; // Latitude du point suivant
    let a = 0;  // "Area" temporaire

    const n = coordinates.length;

    for (let i = 0; i < n; i++) {
        x0 = coordinates[i].lng;
        y0 = coordinates[i].lat;
        x1 = coordinates[(i + 1) % n].lng;
        y1 = coordinates[(i + 1) % n].lat;

        a = x0 * y1 - x1 * y0;
        signedArea += a;

        centroid.lng += (x0 + x1) * a;
        centroid.lat += (y0 + y1) * a;
    }

    signedArea *= 0.5;
    centroid.lng /= (6 * signedArea);
    centroid.lat /= (6 * signedArea);

    return centroid;
};