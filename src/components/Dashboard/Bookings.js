import "../../App.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { BASE_URL } from "../../constants/Api";
const bookingsURL = BASE_URL + "/bookings";

export const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBooking] = useState([]);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      return;
    }
    async function getbookings() {
      const token = auth.jwt;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get(bookingsURL, { headers });
        setBooking(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getbookings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occured</div>;
  }
  return (
    <>
      {bookings.map((booking) => {
        return (
          <div key={booking.id} className="bookings-container">
            <div className="booking-head">
              <p>From {booking.email}</p>
              <p>Name: {booking.name}</p>
              <p>Checkin date: {booking.checkInDate}</p>
              <p>Checkout date: {booking.checkOutDate}</p>
              <p>
                Guests:
                {`${booking.adults} Adult and ${booking.children} Children`}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};
