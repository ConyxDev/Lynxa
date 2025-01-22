import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Permet l'interactivité
import { useState, useEffect } from 'react';
import { database } from "../../firebase-config";
import { ref, get, update } from "firebase/database";
import "../calendar/calendar.css";


const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingRef = ref(database, "adminBookings");
      const snapshot = await get(bookingRef);
      if (snapshot.exists()) {
        const bookings = snapshot.val();
        const confirmedBookings = Object.keys(bookings)
        .filter(key => bookings[key].confirmed === true)
        .map((key) => ({
          id: key,
          ...bookings[key],
        }));
        setEvents(confirmedBookings);
        console.log(confirmedBookings);
      }
    };
    fetchBookings();
  }, []);

  return (
    <FullCalendar
    plugins={[timeGridPlugin, interactionPlugin]}
    initialView="timeGridWeek"  // Vue semaine avec heures
    dayHeaderClassNames="bg-blue-500 text-white font-bold"
    eventClassNames="bg-blue-500 text-white font-bold"
    contentHeight="auto"
    headerToolbar={{
      start: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    }}
    
    locale={frLocale}  // Affichage en français
    className="rounded-[20px] shadow-lg bg-blue-500 text-white font-bold"
    events={events.map(event => ({
      ...event,
      title: `${event.LastName} ${event.FirstName}`,
      start: `${event.time}`,
      end: `${event.end}`,
      service: event.service,
      location: event.location,
      phone: event.phone,
      email: event.email,
    }))}
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
    dateClick={(info) => {
      const eventTitle = prompt('Entrer un titre pour ce rendez-vous:');
      if (eventTitle) {
        setEvents([...events, { title: eventTitle, start: info.dateStr }]);
      }
    }}
    eventDrop={(info) => {
      alert(`Rendez-vous déplacé à : ${info.event.startStr}`);
      const bookingRef = ref(database, `adminBookings/${info.event.id}`);
      update(bookingRef, {
        start: info.event.startStr,
        end: info.event.endStr
      });
    }}
    
    eventResize={(info) => {
      const bookingRef = ref(database, `adminBookings/${info.event.id}`);
      update(bookingRef, {
        start: info.event.startStr,
        end: info.event.endStr
      });
      alert(`Durée du rendez-vous mise à jour.`);
    }}
  />
  );
};

export default CalendarComponent;
