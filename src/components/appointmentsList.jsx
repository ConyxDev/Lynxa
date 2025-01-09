import { useEffect, useState } from "react";

const AppointmentsList = () => {
    const [appointments] = useState([
        {
            locations: [
                "Collonge-Bellerive",
                "Veyrier",
                "Le Grand-Saconnex"
            ]
        },
        {
            times: [
                "09h00 - 10h00",
                "10h15 - 11h15",
                "13h00 - 14h00",
                "14h15 - 15h15",
                "15h45 - 16h45",
                "17h00 - 18h00"
            ]
        }
    ]);

    const [date] = useState(new Date());
    
    return (
        <div>
        <div>
            <h1>{date.toLocaleDateString()}</h1>
        </div>
        <div>
            <h2>Réservez votre rendez-vous</h2>
            <h3>Sélectionnez un créneau horaire parmi les options disponibles ci-dessous.</h3>
        </div>
        <div>
            {appointments.map((appointment) => (
                <ul key={appointment.id}>
                    <li>{appointment.locations}</li>
                    <li>{appointment.times}</li>
                </ul>
            ))}
        </div>
        </div>
    )


}

export default AppointmentsList;