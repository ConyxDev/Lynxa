import Lynxa from "../images/Lynxa.svg";
import MapComponent from "../components/mapView";

function ClientView() {
  return (
    <div className="main-container w-{1920px} min-h-screen flex-shrink-0 px-6 bg-mainbackground "> 
    <div className="header flex w-full items-center gap-2 p-6">
      <img src={Lynxa} alt="Lynxa" className="w-[100px] h-[100px]"/>
      <h1 className="text-3xl font-semibold uppercase tracking-wider">Lynxa</h1>
    </div>
    <div className="boxes-container flex w-full justify-center gap-8">
    <div className="left-column flex flex-col w-[1108px] gap-8">
    <div className="map-container w-full h-[951px] flex-shrink-0 rounded-[45px] bg-white p-4">

      <MapComponent />
    </div>
    <div className="calendar-container w-full h-[768px] flex-shrink-0 rounded-[45px] bg-white"></div>
    </div>
    <div className="right-column flex flex-col w-[695px] gap-8">
    <div className="slot-container w-full h-[736px] flex-shrink-0 rounded-[45px] bg-white"></div>
    <div className="smallCalendar-container w-full h-[986px] flex-shrink-0 rounded-[45px] bg-white"></div>
    </div>
    </div>
    </div>
  );
}

export default ClientView;