import "../../App.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { BASE_URL } from "../../constants/Api";
import { useHistory } from "react-router";
const bookingsURL = BASE_URL + "/bookings";

export const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBooking] = useState([]);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  console.log(setAuth);
  const history = useHistory();
  if (!auth) {
    history.push("/signin");
  }

  useEffect(() => {
    const token = auth.jwt;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    async function getbookings() {
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
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error has occured</div>;
  }

  if (bookings.length === 0) {
    return <div className="empty-items">No incoming bookings yet!</div>;
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
