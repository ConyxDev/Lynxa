import MapView from "../components/mapView";
import CalendarView from "../components/calendarView";
import MapWithZone from "../components/mapWithZone";
import Geolocalisation from "../components/geolocalisation";

function ClientView() {
  return (
    <div className="p-8"> 
      <h1 className="text-2xl font-bold text-center mb-4">Réserver un Rendez-vous</h1>
      {/* Carte interactive */}
     {/*  <MapView /> */}
      {/* <MapWithZone /> */}
      <Geolocalisation />
      {/* Calendrier pour choisir une date */}
      <CalendarView />
    </div>
  );
}

export default ClientView;