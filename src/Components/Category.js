import React from "react";
import Meal from "./Meal";

const Category = ({ category, addMeal }) => {
  return (
    <div className="category">
      <h2>{category.name}</h2>
      <div className="category__meals">
        {category.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} addMeal={addMeal} />;
        })}
      </div>
    </div>
  );
};

export default Category;
