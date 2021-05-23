import "../../App.css";
import "./Hotels.css";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/Api";
import { HotelCards } from "../HotelCards";
export const Guesthouses = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredHotels, setFilteredHotels] = useState([]);

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
          setFilteredHotels(filtered);
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
    const filteredSerach = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(inputValue)
    );
    setFilteredHotels(filteredSerach);
  };

  return (
    <div className="page-inner">
      <header className="hotel-header">
        <div className="page-title">
          <h1>GuestHouses</h1>
        </div>
        <div className="searchbox-container">
          <p>Search for guesthouses</p>
          <input
            type="text"
            onChange={(e) => handleData(e)}
            placeholder="Search by guesthouse name ..."
          />
        </div>
      </header>
      <div className="hotel-card-row ">
        {filteredHotels.map((hotel) => {
          let {
            id,
            name,
            location,
            descriptions,
            features,
            price,
            rating,
            imgURL,
          } = hotel;
          if (hotel.imgURL === null) {
            imgURL =
              "https://res.cloudinary.com/hb5n5nkav/image/upload/v1621779159/placeholder_ibkqxi.png";
          }
          return (
            <HotelCards
              key={id}
              id={id}
              imgURL={imgURL}
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
