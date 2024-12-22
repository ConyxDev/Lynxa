import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarView() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[
        { title: "Rendez-vous A", start: "2024-12-23" },
        { title: "Rendez-vous B", start: "2024-12-24" },
      ]}
    />
  );
}

export default CalendarView;