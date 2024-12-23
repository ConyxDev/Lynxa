import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

function CalendarView() {
    // État pour synchroniser la date sélectionnée entre les deux calendriers
    const [selectedDate, setSelectedDate] = useState("2024-12-23");
  
    const events = [
      { title: "Rendez-vous A", start: "2024-12-23" },
      { title: "Rendez-vous B", start: "2024-12-24" },
      { title: "Rendez-vous C", start: "2024-12-25" },
    ];
  
    // Fonction appelée lorsqu'une date est cliquée dans le calendrier mensuel
    const handleDateClick = (info) => {
      setSelectedDate(info.dateStr);
    };
  
    return (
      <div className="flex gap-4">
        {/* Vue du mois à gauche */}
        <div style={{ flex: 1 }}>
          <h2>Calendrier du mois</h2>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick} // Synchronise la date cliquée
          />
        </div>
  
        {/* Vue du jour à droite */}
        <div className="flex-1 p-4 rounded-lg">
          <h2>Calendrier du jour</h2>
          <FullCalendar
            plugins={[timeGridPlugin]}
            initialView="timeGridDay"
            events={events}
            initialDate={selectedDate} // Affiche la date synchronisée
          />
        </div>
      </div>
    );
  }
  
  export default CalendarView;