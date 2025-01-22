import Lynxa from "../images/Lynxa.svg";
/* import MapComponent from "../components/mapView"; */
import AppointmentsMap from "../components/appointmentsList";
import MapDisplay from "../components/mapDisplay";
import CalendarComponent from "../components/calendar/AdminCalendar";

const ClientView = () => {
  return (
    <div className="main-container w-{1920px} min-h-screen flex-shrink-0 px-6 bg-mainbackground "> 
    <div className="header flex w-full items-center gap-2 p-6">
      <img src={Lynxa} alt="Lynxa" className="w-[100px] h-[100px]"/>
      <h1 className="text-3xl font-semibold uppercase tracking-wider">Lynxa</h1>
    </div>
    <div className="boxes-container flex w-full justify-center gap-8">
    <div className="left-column flex flex-col w-[1108px] gap-8">
    <div className="map-container w-full h-[951px] flex-shrink-0 rounded-[45px] bg-white p-4">
      <h1 className="text-lg font-semibold uppercase tracking-wider mt-[24px] mb-[32px] text-center">Planifiez vos rendez-vous en toute simplicité</h1>
      <h2 className="text-sm font-normal tracking-wider mt-4 text-left mb-[32px]">Visualisez les disponibilités sur une carte interactive, choisissez votre créneau horaire, ou proposez une nouvelle localisation en fonction de vos besoins. </h2>
      <MapDisplay />
    </div>
    <div className="calendar-container w-full h-auto flex-shrink-0 bg-white"><CalendarComponent /></div>
    </div>
    <div className="right-column flex flex-col w-[695px] gap-8">
    <div className="slot-right-container w-full h-[736px] flex-shrink-0 rounded-[45px] bg-white">
      <AppointmentsMap />
    </div>
    <div className="smallCalendar-right-container w-full h-[900px] flex-shrink-0 rounded-[45px] bg-white"></div>
    </div>
    </div>
    </div>
  );
}

export default ClientView;