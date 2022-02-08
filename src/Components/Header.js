import React from "react";

const Header = ({ restaurant }) => {
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
          <h1>{restaurant.name}</h1>
          <p className="gray">{restaurant.description} </p>
        </div>
        <img src={restaurant.picture} alt={restaurant.name} />
      </div>
    </div>
  );
};

export default Header;
