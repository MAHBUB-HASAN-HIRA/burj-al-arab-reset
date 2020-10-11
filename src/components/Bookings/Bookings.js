import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:4200/bookings?email='+loggedInUser.email,{
            method:"GET",
            headers: {
                "authorization" : `Bearer ${sessionStorage.getItem('idToken')}`,
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data) );
    }, []);
  
    return (
        <div>
            <h4>You Have Booking {bookings.length}</h4>
            {
                bookings.map(bookingData => <li>Name: {bookingData.name} ---- From: {(new Date(bookingData.checkIn).toDateString('dd/MM/yyyy'))} ---- To:{(new Date(bookingData.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;