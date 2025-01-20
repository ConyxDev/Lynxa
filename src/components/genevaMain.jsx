import { useEffect, useState } from 'react';
import { database } from '../firebase-config';
import { ref, get } from 'firebase/database';
import proj4 from 'proj4';
import { Polygon, Marker } from '@react-google-maps/api';
/* import axios from 'axios'; */
import markerGoogle from '../assets/icon/markerGoogle.svg';
import { calculateCentroid } from '../components/geometryUtils';

const ConfirmedAppointmentsZones = () => {
    const [zones, setZones] = useState([]); // Stocker les zones confirmées à afficher
    const [appointments, setAppointments] = useState([]); // Stocker les rendez-vous confirmés

    
    // Définition des systèmes de coordonnées
    const MN95 = "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs";
    const WGS84 = "+proj=longlat +datum=WGS84 +no_defs";

    const polygonOptions = {
        fillColor: "#FF5722",
        fillOpacity: 0.35,
        strokeColor: "#FF5722",
        strokeOpacity: 1,
        strokeWeight: 2,
    };

    // Charger les rendez-vous confirmés depuis Firebase
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const bookingRef = ref(database, "adminBookings");
                const snapshot = await get(bookingRef);
        if (snapshot.exists()) {
          const appointmentsData = snapshot.val();
          const appointmentsArray = Object.keys(appointmentsData).map((key) => ({
            id: key, // Ajouter la clé Firebase comme ID
            ...appointmentsData[key],
          }));
          setAppointments(appointmentsArray);
          console.log('Appointments:', appointmentsArray); // Afficher les données dans la console
        } else {
          console.log('No appointments found');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };



/*             try {
                const url = 'https://saasadomicile-default-rtdb.europe-west1.firebasedatabase.app/appointments.json';
                const response = await axios.get(url);
                if (response.data) {
                    const confirmedAppointments = Object.values(response.data).filter(
                        appointment => appointment.status === "confirmed"
                    );
                    setAppointments(confirmedAppointments);
                } else {
                    console.log("No appointments found.");
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        }; */

        fetchAppointments();
    }, []);

    // Charger les données GeoJSON et filtrer par codes postaux confirmés
    useEffect(() => {
        const loadZones = async () => {
            try {
                const zipData = await import('../asset/AMTOVZ_ZIP.json'); // Charger les données GeoJSON
                
                const confirmedZones = appointments.map(appointment => appointment.location.postalCode);

                // Trouver les zones correspondant aux codes postaux confirmés
                const matchingZones = zipData.default.features.filter(feature =>
                    confirmedZones.includes(feature.properties.ZIP4)
                );

                // Convertir les coordonnées pour chaque zone
                const convertedZones = matchingZones.map(zone => {
                    const coordinates = zone.geometry.coordinates[0].map(coord => {
                        const [lng, lat] = proj4(MN95, WGS84, [coord[0], coord[1]]);
                        return { lat, lng };
                    });

                    const center = calculateCentroid(coordinates);

                    return {
                        postalCode: zone.properties.ZIP4,
                        coordinates,
                        center,
                    };
                });

                setZones(convertedZones);
            } catch (error) {
                console.error("Error loading GeoJSON data:", error);
            }
        };

        if (appointments.length > 0) {
            loadZones();
        }
    }, [appointments]);

    if (zones.length === 0) return null;

    return (
        <>
            {zones.map((zone, index) => (
                <>
                <Polygon
                    key={index}
                    paths={zone.coordinates}
                    options={polygonOptions}
                    onClick={() => console.log(`Zone ${zone.postalCode} clicked`)}
                />
                <Marker
                    position={zone.center}
                    icon={markerGoogle}
                    onClick={() => console.log(`Zone ${zone.postalCode} clicked`)}
                />
                </>
            ))}
        </>
    );
};

export default ConfirmedAppointmentsZones;