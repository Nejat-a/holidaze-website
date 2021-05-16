import "../../App.css";
import "./HotelDetail.css";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BASE_URL } from "../../constants/Api";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export const HotelDetail = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          console.log(json);
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
  const imgURL = hotels.image[0].url;
  console.log(imgURL);
  const starImgURL = `https://school.super24.no/sage-img/${hotels.rating}.png`;
  return (
    <div className="hotel-detail-container">
      <div className="page-inner">
        <p className="hotel-detail-heading">
          See details and book <span className="blue">{hotels.name}</span>
        </p>
        <div className="hotel-detail-card" key={hotels.id}>
          <div className="hotel-card-img">
            <img src={`${BASE_URL}${imgURL}`} alt="hotel" />
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
            <Link to="">
              <Button buttonStyle="btn--primary" buttonSize="btn--medium">
                Book now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
