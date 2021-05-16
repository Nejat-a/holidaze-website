import "../../App.css";
import "./Hotels.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/Api";
import { HotelCards } from "../HotelCards";
import { HotelsHeader } from "../HotelsHeader";
export const Guesthouses = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getHotels() {
      const hotelsURL = `${BASE_URL}/hotels`;
      try {
        const response = await fetch(hotelsURL);
        if (response.ok) {
          const json = await response.json();
          const filtered = json.filter((hotel) => {
            return hotel.Type === "guesthouse";
          });
          setHotels(filtered);
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

  return (
    <div className="hotel-container">
      <HotelsHeader pageTitle="Guesthouses" filterTitle="Filter" />
      <div className="hotel-card-row ">
        {hotels.map((hotel) => {
          const { id, name, location, descriptions, features, price, rating } =
            hotel;
          const imgURL = hotel.image[0].url;
          console.log();
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
