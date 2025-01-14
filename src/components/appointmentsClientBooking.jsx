import { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentsClientBooking = () => {
    const [appointments, setAppointments] = useState([]);

    return (
