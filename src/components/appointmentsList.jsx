import { useEffect, useState } from 'react';
import { database } from "../firebase-config";
import { ref, get, update } from "firebase/database"

const AppointmentsMap = () => {
  const [appointmentsArray, setAppointmentsArray] = useState([]); // Stocker les rendez-vous

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // URL Firebase de votre base de données
        const bookingRef = ref(database, "adminBookings");
        const snapshot = await get(bookingRef);

        // Vérification et stockage des données
        if (snapshot.exists()) {
          const appointmentsData = snapshot.val();
          const appointmentsArray = Object.keys(appointmentsData).map((key) => ({
            id: key, // Ajouter la clé Firebase comme ID
            ...appointmentsData[key],
          }));
          setAppointmentsArray(appointmentsArray);
          console.log('Appointments:', appointmentsArray); // Afficher les données dans la console
        } else {
          console.log('No appointments found');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Appointments Map</h1>
      {appointmentsArray.length > 0 ? (
        <ul>
            {appointmentsArray.map((booking, index) => (
            <li key={index}>
            <strong>Date :</strong> {booking?.date ?? "Non spécifiée"}<br />
            <strong>Heure :</strong> {booking?.time ?? "Non spécifiée"}<br />
            <strong>Nom :</strong> {booking?.LastName ?? "Non spécifié"}<br />
            <strong>Prénom :</strong> {booking?.FirstName ?? "Non spécifié"}<br />
            <strong>Email :</strong> {booking?.Email ?? "Non spécifié"}<br />
            <strong>Téléphone :</strong> {booking?.Phone ?? "Non spécifié"}<br />
            <strong>Service :</strong> {booking?.service ?? "Non spécifié"}<br />
            <strong>Adresse :</strong> {booking?.location?.address ?? "Non spécifiée"}<br />
            <strong>Ville :</strong> {booking?.location?.city ?? "Non spécifiée"}<br />
            <strong>Code postal :</strong> {booking?.location?.postalCode ?? "Non spécifié"}<br />
            <strong>Pays :</strong> {booking?.location?.country ?? "Non spécifié"}<br />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading appointments...</p>
      )}
    </div>
  );
};

export default AppointmentsMap;