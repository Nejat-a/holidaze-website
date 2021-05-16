import React from "react";
import { CardItem } from "./CardItem";
import "./Cards.css";

export const Cards = () => {
  return (
    <div className="cards">
      <h1>Find vacation rentals that suits your need</h1>
      <div className="cards-container">
        <div className="cards-items">
          <CardItem
            src="img/hotel.png"
            text="HOTELS"
            label="hotel image"
            path="/hotels"
          />
          <CardItem
            src="img/guesthouse.png"
            text="
              GUESTHOUSES"
            label="guesthouse image"
            path="/guesthouses"
          />
          <CardItem
            src="img/bandb.png"
            text="
              B&BS"
            label="B&BS image"
            path="/bandbs"
          />
        </div>
      </div>
    </div>
  );
};
