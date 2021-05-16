import "../../App.css";
import "./Hotels.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/Api";
import { HotelCards } from "../HotelCards";

export const SeeAllHotels = () => {
  const hotelsURL = `${BASE_URL}hotels`;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <div className="hotel-container">
      <div className="hotel-card-row ">
        {hotels.map((hotel) => {
          return (
            <HotelCards
              name={hotel.name}
              location={hotel.location}
              rating={hotel.rating}
              description={hotel.descriptions}
              features={hotel.features}
              price={hotel.price}
            />
          );
        })}
      </div>
    </div>
  );
};
