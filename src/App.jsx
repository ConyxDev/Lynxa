import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientView from "./features/clientView";
import AdminView from "./features/adminView";
import { LoadScript } from "@react-google-maps/api";
import LoginPage from "./features/loginPage";
import ProtectedRoute from "./features/protectedRoute";
import "./index.css";
import "./App.css";

function App() {
  return (
      <LoadScript 
        googleMapsApiKey="AIzaSyBrjSC_JYE7WmFbfaG5af0405yTM_mOqeY"
        loadingElement={<div>Chargement de la carte...</div>}
      >
        <Routes>
          {/* Route pour la page client accessible librement */}
          <Route path="/" element={<ClientView />} />

          {/* Route pour la page de login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Route pour la partie admin, protégée par login */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute element={<AdminView />} />
            }
          />
        </Routes>
      </LoadScript>
  );
}

export default App;
