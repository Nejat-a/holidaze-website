import { BASE_URL } from "../constants/Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const MainSearch = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();
    const filtered = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(inputValue)
    );
    setFilteredHotels(filtered);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search by hotel name ..."
        onChange={(e) => handleChange(e)}
      />
      <ul className={`search-suggestion ${filteredHotels.length && "padding"}`}>
        {filteredHotels.map((hotel) => {
          const imgURL = hotel.image[0].url;
          const { id, name, location, descriptions, features, price, rating } =
            hotel;

          return (
            <Link to={`/hoteldetail/${id}`}>
              <li
                key={hotel.id}
                id={id}
                imgURL={`${BASE_URL}${imgURL}`}
                name={name}
                location={location}
                rating={rating}
                description={descriptions}
                features={features}
                price={price}
              >
                {hotel.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
