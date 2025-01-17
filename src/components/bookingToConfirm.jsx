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
          const bookingsArray = Object.keys(bookings).map((key) => ({
            id: key, // Ajouter la clé Firebase comme ID
            ...bookings[key],
          }));
          setBookingsArray(bookingsArray);
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
        prev.map((booking) =>
          booking.id === id ? { ...booking, confirmed: true } : booking
        )
      );
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
            <li
              className="w-[30%] border-2 border-black rounded-md p-2 m-2"
              key={booking.id}
            >
              <strong>Nom :</strong> {booking.clientName || "Non spécifié"}<br />
              <strong>Prénom :</strong> {booking.clientFirstName || "Non spécifié"}<br />
              <strong>Nom :</strong> {booking.LastName}<br />
              <strong>Email :</strong> {booking.Email}<br />
              <strong>Adresse :</strong> {booking.location?.address || "Non spécifiée"}<br />
              <strong>Ville :</strong> {booking.location?.city || "Non spécifiée"}<br />
              <strong>Code postal :</strong> {booking.location?.postalCode || "Non spécifié"}<br />
              <strong>Pays :</strong> {booking.location?.country || "Non spécifié"}<br />
              <strong>Statut :</strong>{" "}
              {booking.confirmed ? "Confirmée" : "En attente de confirmation"}
              <br />
              {!booking.confirmed && (
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