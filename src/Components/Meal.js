import React from "react";

const Meal = ({ meal, addMeal }) => {
  return (
    <div className="meal">
      <div className="meal__card" onClick={() => addMeal(meal)}>
        <div className="meal__left">
          <h3>{meal.title}</h3>
          {meal.description ? <p className="gray">{meal.description}</p> : ""}
          <div className="meal--infos gray">
            <span>{meal.price} €</span>
            <span className="popular">{meal.popular ? "popular" : ""}</span>
          </div>
        </div>
        {meal.picture ? (
          <img className="meal__img" src={meal.picture} alt={meal.title} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Meal;
