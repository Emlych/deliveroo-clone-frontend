import React from "react";

const Header = ({ restaurantName, restaurantDescription, imgSrc }) => {
  return (
    <div className="header">
      <div className="header__top">
        <img
          src="https://cdn.cdnlogo.com/logos/d/62/deliveroo.svg"
          alt="Deliveroo logo"
        />
      </div>
      <div className="header__bottom container">
        <div className="header__bottom--left">
          <h1>{restaurantName}</h1>
          <p className="gray">{restaurantDescription} </p>
        </div>
        <img src={imgSrc} alt={restaurantName} />
      </div>
    </div>
  );
};

export default Header;
