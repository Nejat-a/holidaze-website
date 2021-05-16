import { Link } from "react-router-dom";
import { Button } from "../Button";
import "./About.css";

export const About = () => {
  return (
    <div className="hero-container">
      <div className="page-inner">
        <div className="about-content">
          <h1 className="about-header">About Us</h1>
          <p>
            Welcome to Holidaze, your number one source for all hotels in
            Bergen. We're dedicated to providing you the very best of hotels,
            with an emphasis on best price and excellent cusomer service.
          </p>
          <p>
            Founded in 2021 by Team Nejat, Holidaze has come a long way from its
            beginnings.
          </p>
          <p>
            We hope you enjoy our service as much as we enjoy offering them to
            you. If you have any questions or comments, please don't hesitate to
            contact us. Sincerely, Nejat at Holidaze hotels.
          </p>
          <div className="button-container">
            <Link to="/contact">
              <Button buttonSize="btn--medium">Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
