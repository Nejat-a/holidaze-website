import "../App.css";
import "./HeroSection.css";
import { MainSearch } from "./MainSearch";

export const HeroSection = () => {
  return (
    <div className="hero-container">
      <h1>HOTELS IN BERGEN</h1>
      <p>Best price on hotels, B&Bs and Guesthouses</p>
      <MainSearch />
    </div>
  );
};
