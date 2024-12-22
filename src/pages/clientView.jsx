import MapView from "../components/mapView";
import CalendarView from "../components/calendarView";

function ClientView() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">Réserver un Rendez-vous</h1>
      {/* Carte interactive */}
      <MapView />

      {/* Calendrier pour choisir une date */}
      <CalendarView />
    </div>
  );
}

export default ClientView;