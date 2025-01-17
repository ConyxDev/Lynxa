import { useEffect, useState } from "react";
import { auth, database } from "../firebase-config";
import { ref, onValueChange, get } from "firebase/database";

const BookingToConfirm = () => {
    const[filteredBookings, setFilteredBookings] = useState([]);
    const[filter, setFilter] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            const bookingRef = ref(database, 'adminBookings');
            const snapshot = await get(bookingRef);
            
            if (snapshot.exists()) {
                const bookings = snapshot.val();
                const bookingsArray = Object.keys(bookings).map(key => bookings[key]);
                setFilteredBookings(bookingsArray);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div>
            <h1>Réservations à confirmer</h1>
            
        </div>
    );
};
