import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";

export const HotelCardItem = ({
  imgURL,
  name,
  location,
  description,
  rating,
  features,
  price,
  id,
  onClick,
  buttonLink,
}) => {
  const starImgURL = `https://school.super24.no/sage-img/${rating}.png`;

  return (
    <div className="hotel-card" key={id}>
      <div className="hotel-card-img">
        <img src={imgURL} alt="hotel" />
      </div>
      <div className="hotel-card-content-middle">
        <h2 className="hotel-name">{name}</h2>
        <h4>
          <i className="fas fa-map-marker-alt"></i> {location}
        </h4>
        <div className="rating">
          <img src={starImgURL} alt="rating" />
        </div>
        <p>{description}</p>
      </div>
      <div className="hotel-card-content-right">
        <div>{features}</div>
        <h2 className="price">NOK {price}</h2>
        <Link to={buttonLink}>
          <Button buttonStyle="btn--outline" onClick={onClick}>
            See details
          </Button>
        </Link>
      </div>
    </div>
  );
};
