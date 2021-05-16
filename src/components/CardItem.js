import { Link } from "react-router-dom";
export const CardItem = ({ path, label, text, src }) => {
  return (
    <>
      <div className="card">
        <div className="card-img">
          <Link className="cards-item-link" to={path}>
            <img src={src} alt={label} />
          </Link>
        </div>
        <h5 className="cards-item-text">{text}</h5>
      </div>
    </>
  );
};
