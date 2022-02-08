import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Category from "./Components/Category";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [mealList, setMealList] = useState([]);

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://deliveroo-clone-eld.herokuapp.com/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  //add meal to cart
  const addMeal = (meal) => {
    const newMealList = [...mealList];
    let newMeal = {};

    if (!newMealList.length) {
      console.log("first item in my cart");

      newMeal = {
        id: meal.id,
        quantity: 1,
        title: meal.title,
        price: meal.price,
      };
      newMealList.push(newMeal);
    } else {
      for (let i = 0; i < newMealList.length; i++) {
        if (meal.id !== newMealList[i].id) {
          console.log("first type of this meal: ", newMealList[i].title);
          newMeal = {
            id: meal.id,
            quantity: 1,
            title: meal.title,
            price: meal.price,
          };
          newMealList.push(newMeal);
        } else {
          console.log("already got it but ok");
          newMealList[i] = {
            id: meal.id,
            quantity: newMealList[i].quantity + 1,
            title: meal.title,
            price: meal.price,
          };
        }
      }
    }

    setMealList(newMealList);
  };

  return isLoading ? (
    <span>En cours de chargement ...</span>
  ) : (
    <div className="app">
      <Header restaurant={data.restaurant} />

      <div className="container main">
        <div className="main__categories">
          {data.categories.map((category, index) => {
            return (
              category.meals.length && (
                <Category key={index} category={category} addMeal={addMeal} />
              )
            );
          })}
        </div>
        <div className="main__cart">
          <button>Valider mon panier</button>
          {mealList.map((item, index) => {
            return (
              <div className="cart--line" key={index}>
                <div className="cart--quantity">- {item.quantity} +</div>
                <div className="cart--title">{item.title}</div>
                <div className="cart--price">{item.price} €</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
