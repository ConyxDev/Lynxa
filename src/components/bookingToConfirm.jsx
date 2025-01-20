import { useEffect, useState } from "react";
import { database } from "../firebase-config";
import { ref, get, update } from "firebase/database";

const BookingToConfirm = () => {
  const [bookingsArray, setBookingsArray] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingRef = ref(database, "adminBookings");
        const snapshot = await get(bookingRef);

        if (snapshot.exists()) {
          const bookings = snapshot.val();
          // Convertir en tableau avec la clé incluse
          const filteredBookings = Object.keys(bookings)
          .filter(key => bookings[key] && typeof bookings[key] === 'object') // Filtrer les objets valides
          .map((key) => ({
            id: key,
            ...bookings[key],
          }))
          .filter((booking) => booking && booking.confirmed !== true);  // Filtrer les réservations non confirmées
  
        setBookingsArray(filteredBookings);
        } else {
          console.log("Aucune réservation trouvée.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des réservations :", error);
      }
    };

    fetchBookings();
  }, []);

  const handleConfirm = async (id) => {
    try {
      const bookingRef = ref(database, `adminBookings/${id}`);
      await update(bookingRef, { confirmed: true });
      console.log(`Réservation ${id} confirmée.`);
      // Met à jour localement l'état pour refléter la confirmation
      setBookingsArray((prev) =>
        	prev.filter((booking) => booking.id !==id));
    } catch (error) {
      console.error("Erreur lors de la confirmation de la réservation :", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Réservations à confirmer</h1>
      <ul className="flex flex-wrap gap-2">
        {bookingsArray.length > 0 ? (
          bookingsArray.map((booking) => (
          <li key={booking.id}>
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
            <strong>Statut :</strong> {booking?.confirmed ? "Confirmée" : "En attente de confirmation"}
            <br />
            {!booking?.confirmed && (
              <button
                className="bg-blue-500 p-2 rounded-md mt-2"
                onClick={() => handleConfirm(booking.id)}
              >
                Confirmer
              </button>
            )}
          </li>
          ))
        ) : (
          <p>Aucune réservation à afficher.</p>
        )}
      </ul>
    </div>
  );
};

export default BookingToConfirm;