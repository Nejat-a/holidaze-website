import "./Dashboardpage.css";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Emails } from "./Emails";
import { Bookings } from "./Bookings";
import { EditHotels } from "./EditHotels";

export const Dashboardpage = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [showMessagePanel, setshowMessagePanel] = useState(false);
  const [showBookingsPanel, setshowBookingsePanel] = useState(false);
  const [showEditHotelsPanel, setsshowEditHotelsPanel] = useState(false);
  const history = useHistory();

  //   return <>{auth ? <h1>Welcome to dashboard</h1> : history.push("/signin")}</>;

  if (!auth) {
    history.push("/signin");
  }

  const toggleMessageBody = () => {
    setshowMessagePanel(!showMessagePanel);
  };

  const toggleBookingsBody = () => {
    setshowBookingsePanel(!showBookingsPanel);
  };

  const toggleHotelBody = () => {
    setsshowEditHotelsPanel(!showEditHotelsPanel);
  };
  return (
    <div className="dashboard-container">
      <div className="page-inner">
        <div className="dashboard-header">
          <h1>Welcome back admin</h1>
          <p>
            Here you can check your inbox, incoming bookings and edit your hotel
            database
          </p>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-item">
            <div
              className="dashboard-messages-header"
              onClick={toggleMessageBody}
            >
              <i className="far fa-envelope"></i>
              <h2>Inbox</h2>
            </div>
            <div className="dashboard-message-body">
              {showMessagePanel ? <Emails /> : ""}
            </div>
          </div>

          <div className="dashboard-item">
            <div
              className="dashboard-bookings-header"
              onClick={toggleBookingsBody}
            >
              <i className="fas fa-shopping-basket"></i>
              <h2>Bookings</h2>
            </div>
            <div className="dashboard-booking-body">
              {showBookingsPanel ? <Bookings /> : ""}
            </div>
          </div>

          <div className="dashboard-item">
            <div className="dashboard-hotel-header" onClick={toggleHotelBody}>
              <i className="fas fa-hotel"></i>
              <h2>Edit hotels</h2>
            </div>
            <div className="dashboard-hotel-body">
              {showEditHotelsPanel ? <EditHotels /> : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
