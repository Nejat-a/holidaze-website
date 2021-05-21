import React from "react";
import { useEffect, useState } from "react";

export const TestSearch = () => {
  const api = "http://localhost:1337/hotels";
  const [hotels, sethotels] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(api);
        const json = await res.json();
        sethotels(json);
        setFiltered(json);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  const handleSerach = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();
    console.log(inputValue);
    const filtered = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(inputValue)
    );
    setFiltered(filtered);
    console.log(filtered);
  };
  return (
    <>
      <input
        type="text"
        onChange={function (e) {
          handleSerach(e);
        }}
      />
      <div>
        {filtered.map((hotel) => {
          return <h1>{hotel.name}</h1>;
        })}
      </div>
    </>
  );
};
