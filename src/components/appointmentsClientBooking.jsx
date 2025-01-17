import { useState } from "react";
import { db, auth } from "../firebase-config"; // Importez Firebase config
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminBooking = () => {
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    clientName: "",
    clientEmail: "",
    service: "",
    location: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    confirmed: false,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user] = useAuthState(auth); // Vérifie l'état d'authentification

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const field = name.split(".")[1];
      setBookingData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setBookingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (!user) {
      setErrorMessage("Vous devez être connecté pour ajouter une réservation.");
      setLoading(false);
      return;
    }

    try {
      // Ajout du document dans la collection "adminBookings"
      const docRef = await addDoc(collection(db, "adminBookings"), {
        ...bookingData,
        userId: user.uid, // Associe la réservation à l'utilisateur connecté
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      setSuccessMessage(`Réservation ajoutée avec succès (ID: ${docRef.id})`);
      setBookingData({
        date: "",
        time: "",
        clientName: "",
        clientEmail: "",
        service: "",
        location: {
          address: "",
          city: "",
          postalCode: "",
          country: "",
        },
        confirmed: false,
      });
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      setErrorMessage("Impossible d'ajouter la réservation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Créer une nouvelle réservation (Admin Booking)</h1>
      {loading && <p>Chargement...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleAddBooking}>
        <input
          type="date"
          name="date"
          value={bookingData.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="time"
          name="time"
          value={bookingData.time}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="clientName"
          value={bookingData.clientName}
          onChange={handleInputChange}
          placeholder="Nom du client"
          required
        />
        <input
          type="email"
          name="clientEmail"
          value={bookingData.clientEmail}
          onChange={handleInputChange}
          placeholder="Email du client"
          required
        />
        <input
          type="text"
          name="service"
          value={bookingData.service}
          onChange={handleInputChange}
          placeholder="Service demandé"
          required
        />
        <input
          type="text"
          name="location.address"
          value={bookingData.location.address}
          onChange={handleInputChange}
          placeholder="Adresse"
        />
        <input
          type="text"
          name="location.city"
          value={bookingData.location.city}
          onChange={handleInputChange}
          placeholder="Ville"
        />
        <input
          type="text"
          name="location.postalCode"
          value={bookingData.location.postalCode}
          onChange={handleInputChange}
          placeholder="Code postal"
        />
        <input
          type="text"
          name="location.country"
          value={bookingData.location.country}
          onChange={handleInputChange}
          placeholder="Pays"
        />

        <button type="submit" disabled={loading}>
          Ajouter la réservation
        </button>
      </form>
    </div>
  );
};

export default AdminBooking;
