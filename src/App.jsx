import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientView from "./pages/clientView";
import AdminView from "./pages/adminView";
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la partie visuelle client */}
        <Route path="/" element={<ClientView />} />

        {/* Route pour la partie admin commerçant */}
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
    
  );
}

export default App;
