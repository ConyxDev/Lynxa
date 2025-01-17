import { useState, useEffect } from 'react';
import { auth, database } from '../firebase-config'; // Importez votre configuration Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { ref, push } from 'firebase/database';


const AdminBooking = () => {
  const [user] = useAuthState(auth); // Vérifie si un utilisateur est connecté
  const [bookingData, setBookingData] = useState({
    userId: '',
    date: '',
    time: '',
    LastName: '',
    FirstName: '',
    Email: '',
    Phone: '',  
    service: '',
    location: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
    confirmed: false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Met à jour l'ID de l'utilisateur connecté dans bookingData
  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        userId: user.uid,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('location.')) {
      const field = name.split('.')[1];
      setBookingData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else {
      setBookingData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!user) {
      setErrorMessage('Vous devez être connecté pour ajouter une réservation.');
      return;
    }

    try {
      // Ajout de la réservation dans la collection "adminBookings"
    const bookingRef = ref(database, 'adminBookings');
    const newBookingRef = await push(bookingRef, {
        ...bookingData, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString()
    });
    console.log('Booking added with key:', newBookingRef.key); // Affiche la clé unique générée
      setSuccessMessage('Réservation ajoutée avec succès.');
      setBookingData({
        userId: user.uid,
        date: '',
        time: '',
        LastName: '',
        FirstName: '',
        Email: '',
        Phone: '',
        service: '',
        location: {
          address: '',
          city: '',
          postalCode: '',
          country: '',
        },
        confirmed: false,
      });
    } catch (error) {
      console.error('Error adding booking:', error);
      setErrorMessage("Impossible d'ajouter la réservation. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h1>Admin Booking</h1>
      {!user && <p style={{ color: 'red' }}>Vous devez être connecté pour accéder à cette page.</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {user && (
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
            name="LastName"
            value={bookingData.LastName}
            onChange={handleInputChange}
            placeholder="Nom du client"
            required
          />
          <input
            type="text"
            name="FirstName"
            value={bookingData.FirstName}
            onChange={handleInputChange}
            placeholder="Prénom du client"
            required
          />
          <input
            type="email"
            name="Email"
            value={bookingData.Email}
            onChange={handleInputChange}
            placeholder="Email du client"
            required
          />
          <input
            type="tel"
            name="Phone"
            value={bookingData.Phone}
            onChange={handleInputChange}
            placeholder="Téléphone du client"
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
          <button type="submit">Ajouter la réservation</button>
        </form>
      )}
    </div>
  );
};

export default AdminBooking;
