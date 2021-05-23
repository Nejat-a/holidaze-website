import "../../App.css";
import "./Hotels.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/Api";
import { HotelCards } from "../HotelCards";
export const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);
  useEffect(() => {
    const hotelsURL = `${BASE_URL}/hotels`;
    async function getHotels() {
      try {
        const response = await fetch(hotelsURL);
        if (response.ok) {
          const json = await response.json();
          setHotels(json);
          setFilteredHotels(json);
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
  const handleData = (event) => {
    const inputValue = event.target.value.trim().toLowerCase();
    const filtered = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(inputValue)
    );
    setFilteredHotels(filtered);
  };

  return (
    <div className="page-inner">
      <header className="hotel-header">
        <div className="page-title">
          <h1>Hotels</h1>
        </div>
        <div className="searchbox-container">
          <p>Search for hotels</p>
          <input
            type="text"
            onChange={(e) => handleData(e)}
            placeholder="Search by hotel name ..."
          />
        </div>
      </header>
      <div className="hotel-card-row">
        {filteredHotels.map((hotel) => {
          const { id, name, location, descriptions, features, price, rating } =
            hotel;
          let imgURL = hotel.image[0].url;
          if (imgURL === undefined) {
            imgURL = `/uploads/placeholder_65441b3664.png`;
          }

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
