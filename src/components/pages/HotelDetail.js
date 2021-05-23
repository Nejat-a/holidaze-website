import "../../App.css";
import "./HotelDetail.css";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BASE_URL } from "../../constants/Api";
import { Button } from "../Button";
import { BookNow } from "../BookNow";
export const HotelDetail = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const hotelURL = `${BASE_URL}/hotels`;

  let history = useHistory();
  const { id } = useParams();

  if (!id) {
    history.push("/");
  }

  const url = hotelURL + "/" + id;

  useEffect(() => {
    async function getHotels() {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setHotels(json);
        } else {
          setError("An error has occred");
        }
      } catch (error) {
        setError(error.toString);
      } finally {
        setLoading(false);
      }
    }
    getHotels();
  }, [url]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>ERROR! An error has occured!</div>;
  }

  const starImgURL = `https://school.super24.no/sage-img/${hotels.rating}.png`;
  const handleBooking = () => {
    setShowBookingForm(true);
    document.location.href = "#bookingForm";
  };
  return (
    <div className="hotel-detail-container">
      <div className="page-inner">
        <p className="hotel-detail-heading">
          See details and book <span className="blue">{hotels.name}</span>
        </p>
        <div className="hotel-detail-card" key={hotels.id}>
          <div className="hotel-card-img">
            <img
              src={
                hotels.imgURL === null
                  ? "https://res.cloudinary.com/hb5n5nkav/image/upload/v1621779159/placeholder_ibkqxi.png"
                  : hotels.imgURL
              }
              alt="hotel"
            />
          </div>
          <div className="hotel-card-content">
            <h2 className="hotel-name">{hotels.name}</h2>
            <h4 className="blue">
              <i className="fas fa-map-marker-alt"></i> {hotels.location}
            </h4>
            <div className="hotel-detail-rating">
              <img src={starImgURL} alt="rating" />
            </div>
            <p className="hotel-detail-description">{hotels.descriptions}</p>

            <div>{hotels.features}</div>
            <h2 className="hotel-detail-price pink">NOK {hotels.price}</h2>

            <Button
              buttonStyle="btn--primary"
              buttonSize="btn--medium"
              onClick={() => handleBooking()}
            >
              Book now
            </Button>
            <span id="bookingForm"></span>
          </div>
        </div>
        <div className="booking-form">
          {showBookingForm ? <BookNow hotels={hotels} /> : ""}
        </div>
      </div>
    </div>
  );
};
