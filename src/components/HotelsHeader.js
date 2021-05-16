import React from "react";
import "./HotelsHeader.css";
import { Filter } from "./Filter";

export const HotelsHeader = ({ pageTitle, filterTitle }) => {
  return (
    <header className="hotel-header">
      <div className="header-top">
        <h1>{pageTitle}</h1>
      </div>
      <div className="header-bottom">
        <h2>{filterTitle}</h2>
        <div className="checkbox-container">
          <Filter />
        </div>
      </div>
    </header>
  );
};
