import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const CartLine = ({ item, index, handleQuantity, totalMealPrice }) => {
  return (
    <div className="cart--line" key={index}>
      <div className="cart--quantity">
        <div
          className="handleQuantity"
          onClick={() => handleQuantity(index, "decrement")}
        >
          <FontAwesomeIcon icon={faMinus} />
        </div>
        <div className="quantity"> {item.quantity}</div>
        <div
          className="handleQuantity"
          onClick={() => handleQuantity(index, "increment")}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      <div className="cart--title">{item.title}</div>
      <div className="cart--price">{totalMealPrice(item)} €</div>
    </div>
  );
};

export default CartLine;
