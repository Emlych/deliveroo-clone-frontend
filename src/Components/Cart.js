import React from "react";
import CartLine from "./CartLine";

const Cart = ({
  mealList,
  handleQuantity,
  totalMealPrice,
  sumSubTotal,
  deliverFee,
  subtotal,
}) => {
  return (
    <div className="main__cart">
      <button className="btn--cart">Valider mon panier</button>
      <div className="meallist">
        {mealList.map((item, index) => {
          return (
            <CartLine
              item={item}
              index={index}
              handleQuantity={handleQuantity}
              totalMealPrice={totalMealPrice}
            />
          );
        })}
      </div>
      <div className="subtotal">
        <div className="subtotal--line">
          <div className="subtotal-text">Sous-total</div>
          {/* <div className="subtotal-price">{sumSubTotal()} €</div> */}
          <div className="subtotal-price">{subtotal} €</div>
        </div>
        <div className="subtotal--line">
          <div className="subtotal-text">Frais de livraison</div>
          <div className="subtotal-price">2.50 €</div>
        </div>
      </div>
      <div className="total--line">
        <div className="total-text">Total</div>
        <div className="total-price">
          {/* {sumSubTotal() + Number(deliverFee)} € */}
          {subtotal + Number(deliverFee)} €
        </div>
      </div>
    </div>
  );
};

export default Cart;
