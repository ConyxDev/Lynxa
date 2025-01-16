import { useState } from "react";
import { db, auth } from "../firebase-config"; // Assurez-vous d'exporter 'auth' depuis firebase-config.js
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const newAppointment = {
  confirmed: false,
  date: "",
  time: "",
  location: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  },
  service: "",
  name: "",
  firstname: "",
  email: "",
  phone: "",
  message: "",
};

const AppointmentsClientBooking = () => {
  const [appointment, setAppointment] = useState(newAppointment);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user] = useAuthState(auth); // Vérifie l'état de connexion de l'utilisateur

  const handleBookAppointment = async () => {
    if (!user) {
      setError("Vous devez être connecté pour prendre un rendez-vous.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Création d'une nouvelle collection nommée dynamiquement par exemple avec l'ID utilisateur
      const newCollectionName = `appointments_${user.uid}`;

      // Ajouter le rendez-vous à la nouvelle collection
      const docRef = await addDoc(collection(db, newCollectionName), {
        ...appointment,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      console.log("Rendez-vous ajouté avec l'ID :", docRef.id);
      setSuccess("Rendez-vous ajouté avec succès !");
      setAppointment(newAppointment); // Réinitialiser le formulaire
    } catch (err) {
      console.error("Erreur lors de l'ajout du rendez-vous :", err);
      setError("Erreur lors de l'ajout du rendez-vous. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAppointment(newAppointment);
    setError("");
    setSuccess("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Prendre rendez-vous</h1>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input type="date" onChange={handleInputChange} name="date" value={appointment.date} />
      <input type="time" onChange={handleInputChange} name="time" value={appointment.time} />
      <input type="text" placeholder="Nom" onChange={handleInputChange} name="name" value={appointment.name} />
      <input type="text" placeholder="Prénom" onChange={handleInputChange} name="firstname" value={appointment.firstname} />
      <input type="email" placeholder="Email" onChange={handleInputChange} name="email" value={appointment.email} />
      <input type="text" placeholder="Téléphone" onChange={handleInputChange} name="phone" value={appointment.phone} />
      <input type="text" placeholder="Message" onChange={handleInputChange} name="message" value={appointment.message} />
      <input type="text" placeholder="Adresse" onChange={handleInputChange} name="location.address" value={appointment.location.address} />
      <input type="text" placeholder="Ville" onChange={handleInputChange} name="location.city" value={appointment.location.city} />
      <input type="text" placeholder="Code postal" onChange={handleInputChange} name="location.postalCode" value={appointment.location.postalCode} />
      <input type="text" placeholder="Pays" onChange={handleInputChange} name="location.country" value={appointment.location.country} />
      <input type="text" placeholder="Service" onChange={handleInputChange} name="service" value={appointment.service} />

      <button onClick={handleBookAppointment} disabled={loading}>
        Prendre rendez-vous
      </button>
      <button onClick={handleReset} disabled={loading}>
        Réinitialiser
      </button>
    </div>
  );
};

export default AppointmentsClientBooking;