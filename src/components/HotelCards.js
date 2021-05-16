import { HotelCardItem } from "./HotelCardItem";
import "./HotelCard.css";

export const HotelCards = ({
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
  return (
    <HotelCardItem
      id={id}
      imgURL={imgURL}
      name={name}
      location={location}
      description={description}
      rating={rating}
      price={price}
      features={features}
      onClick={onClick}
      buttonLink={buttonLink}
    />
  );
};
