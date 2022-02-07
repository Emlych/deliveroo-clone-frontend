import React from "react";

const Meal = ({
  mealTitle,
  mealDescription,
  mealPrice,
  mealPopular,
  mealImgSrc,
}) => {
  return (
    <div className="meal">
      <div className="meal__card">
        <div className="meal__left">
          <h3>{mealTitle}</h3>
          {mealDescription ? <p className="gray">{mealDescription}</p> : ""}
          <div className="meal--infos gray">
            <span>{mealPrice} €</span>
            <span className="popular">{mealPopular ? "popular" : ""}</span>
          </div>
        </div>
        {mealImgSrc ? (
          <img className="meal__img" src={mealImgSrc} alt={mealTitle} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Meal;
