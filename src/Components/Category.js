import React from "react";
import Meal from "./Meal";

const Category = ({ categoryName, meals }) => {
  return (
    <div className="category">
      <h2>{categoryName}</h2>
      <div className="category__meals">
        {meals.map((item, index) => {
          return (
            <Meal
              mealTitle={item.title}
              mealDescription={item.description}
              mealImgSrc={item.picture}
              mealPrice={item.price}
              mealPopular={item.popular}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
