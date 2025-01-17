import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import AppointmentsMap from "../components/appointmentsList";
import MapDisplay from "../components/mapDisplay";
import AdminBooking from "../components/appointmentsClientBooking";
import AdminBookingFirestore from "../components/adminBookingFirestore";

const AdminView = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login"); // Rediriger après déconnexion
  };

  return (
    <div>
      <h1>Tableau de Bord Admin</h1>
      <button onClick={handleLogout}>Déconnexion</button>
      {/* Outils et gestion des rendez-vous */}
      <div className="p-8">
        <p>Liste des rendez-vous confirmés...</p>
        <AppointmentsMap />
        <MapDisplay />
        <AdminBooking />
        <AdminBookingFirestore />
      </div>
    </div>
  );
};

export default AdminView;