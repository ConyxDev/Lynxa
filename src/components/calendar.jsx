import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Permet l'interactivité
import { useState, useEffect } from 'react';
import { database } from "../firebase-config";
import { ref, get } from "firebase/database";


const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingRef = ref(database, "adminBookings");
      const snapshot = await get(bookingRef);
      if (snapshot.exists()) {
        const bookings = snapshot.val();
        const formattedEvents = Object.keys(bookings).map((key) => ({
          id: key,
          title: bookings[key].clientName || "Rendez-vous",
          start: bookings[key].date + "T" + bookings[key].time,
          extendedProps: { ...bookings[key] }
        }));
        setEvents(formattedEvents);
      }
    };
    fetchBookings();
  }, []);

  return (
    <FullCalendar
    plugins={[timeGridPlugin, interactionPlugin]}
    initialView="timeGridWeek"  // Vue semaine avec heures
    locale={frLocale}  // Affichage en français
      
    slotLabelFormat={{
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,  // Format 24h
      hour12: false
    }}

    dayHeaderFormat={{ weekday: 'long' }}  // Ex: "Lundi, Mardi..."
    firstDay={1}  // La semaine commence le lundi

    buttonText={{
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'Liste'
    }}

    allDayText="Toute la journée"
    slotMinTime="08:00:00"
    slotMaxTime="18:00:00"

    // Permettre les interactions
    editable={true} 
    selectable={true} 

    // Gérer un clic sur un créneau horaire
    dateClick={(info) => alert(`Créneau sélectionné: ${info.dateStr}`)}
  />
  );
};

export default CalendarComponent;
