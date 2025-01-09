import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientView from "./pages/clientView";
import AdminView from "./pages/adminView";
import { LoadScript } from "@react-google-maps/api";
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <LoadScript 
        googleMapsApiKey="AIzaSyBrjSC_JYE7WmFbfaG5af0405yTM_mOqeY"
        loadingElement={<div>Chargement de la carte...</div>}
      >
        <Routes>
          {/* Route pour la partie visuelle client */}
          <Route path="/" element={<ClientView />} />

          {/* Route pour la partie admin commerçant */}
          <Route path="/admin" element={<AdminView />} />
        </Routes>
      </LoadScript>
    </Router>
    
  );
}

export default App;
