import { Link } from "react-router-dom";
import "../App.css";
import { Button } from "./Button";
import "./Footer.css";
import logo from "../images/holidaze-logo-white.png";

export default function Footer() {
  const toTheTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <footer className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">Join our newsletter</p>
        <p className="footer-subscription-text">
          We never send spam, only hotel deals
        </p>
        <div className="input-areas">
          <form>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="footer-input"
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <div className="footer-about-text">
              Holidaze is one of the biggest hotel companies in Bergen, Norway.
              We have hundreds of hotels, guesthouses and B&Bs.
            </div>
          </div>

          <div className="footer-link-items">
            <h2>Asets</h2>
            <div className="footer-about-text">
              Many hotel images is downloaded from scandichotels.no. This
              website is for education purposes only.
            </div>
          </div>

          <div className="footer-link-items">
            <h2>Navigate</h2>
            <Link to="/" onClick={toTheTop}>
              Homepage
            </Link>
            <Link to="/hotels" onClick={toTheTop}>
              Hotels
            </Link>
            <Link to="/guesthouses" onClick={toTheTop}>
              Guesthouses
            </Link>
            <Link to="/bandbs" onClick={toTheTop}>
              B&Bs
            </Link>
            <Link to="/about" onClick={toTheTop}>
              About Us
            </Link>
            <Link to="/contact" onClick={toTheTop}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/">
              <img src={logo} alt="logo"></img>
            </Link>
            <p className="copyright">&copy;COPYRIGHT 2021 - HOLIDAZE</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
