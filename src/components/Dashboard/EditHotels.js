import "../../App.css";
import "../pages/Hotels.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/Api";
import { HotelCards } from "../HotelCards";
import { Button } from "../Button";
import { AddNewHotel } from "./AddNewHotel";
export const EditHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddNewHotel, setShowAddNewHotel] = useState(false);

  useEffect(() => {
    const hotelsURL = `${BASE_URL}/hotels`;
    async function getHotels() {
      try {
        const response = await fetch(hotelsURL);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setHotels(json);
        } else {
          setError("An error occired");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getHotels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! An error occured</div>;
  }

  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const openAddHotelForm = () => {
    setShowAddNewHotel(!showAddNewHotel);
  };
  return (
    <div className="page-inner">
      <div className="add-hotels">
        <Button buttonStyle="btn--outline" onClick={openAddHotelForm}>
          Add new <i className="fas fa-plus-circle"></i>
        </Button>
      </div>
      <div className="add-new-hotel-form-container">
        {showAddNewHotel ? <AddNewHotel /> : ""}
      </div>
      <div className="hotel-card-row">
        {hotels.map((hotel) => {
          const { id, name, location, descriptions, features, price, rating } =
            hotel;
          const imgURL = hotel.image[0].url;

          return (
            <HotelCards
              key={id}
              id={id}
              imgURL={`${BASE_URL}${imgURL}`}
              name={name}
              location={location}
              rating={rating}
              description={descriptions}
              features={features}
              price={price}
              onClick={() => handleClick()}
              buttonLink={`hoteldetail/${id}`}
            />
          );
        })}
      </div>
    </div>
  );
};
