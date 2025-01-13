import { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsMap = () => {
  const [appointments, setAppointments] = useState([]); // Stocker les rendez-vous

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        // URL Firebase de votre base de données
        const url =
          'https://saasadomicile-default-rtdb.europe-west1.firebasedatabase.app/appointments.json';

        // Appel à Firebase pour récupérer les données
        const response = await axios.get(url);

        // Vérification et stockage des données
        if (response.data) {
          const appointmentsData = Object.values(response.data); // Convertir en tableau
          setAppointments(appointmentsData);
          console.log('Appointments:', appointmentsData); // Afficher les données dans la console
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
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <strong>Date:</strong> {appointment.date} <br />
              <strong>Time Slot:</strong> {appointment.timeSlot} <br />
              <strong>Location:</strong> {appointment.location} <br />
              <strong>Postal Code:</strong> {appointment.postalCode} <br />
              <strong>Status:</strong> {appointment.status}
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