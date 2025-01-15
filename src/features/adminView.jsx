import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

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
      </div>
    </div>
  );
};

export default AdminView;