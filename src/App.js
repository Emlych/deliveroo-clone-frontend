import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Category from "./Components/Category";
import Cart from "./Components/Cart";

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

    if (
      !newMealList.length ||
      !newMealList.some((item) => item.id === meal.id)
    ) {
      newMeal = {
        id: meal.id,
        quantity: 1,
        title: meal.title,
        price: Number(meal.price),
      };
      newMealList.push(newMeal);
    } else {
      for (let i = 0; i < newMealList.length; i++) {
        if (meal.id === newMealList[i].id) {
          newMealList[i].quantity++;
        }
      }
    }
    setMealList(newMealList);
    sumSubTotal();
  };

  //increment or decrement meal quantity in cart
  const handleQuantity = (index, calculation) => {
    const newMealList = [...mealList];
    if (calculation === "decrement") {
      if (newMealList[index].quantity === 1) {
        newMealList.splice(index, 1);
      } else {
        newMealList[index].quantity -= 1;
      }
    }
    if (calculation === "increment") newMealList[index].quantity += 1;

    setMealList(newMealList);
    sumSubTotal();
  };
  //calcul total price per type of meal
  const totalMealPrice = (item) => {
    return (Number(item.price) * item.quantity).toFixed(2);
  };

  //calculate subtotal
  const sumSubTotal = () => {
    let subtotal = 0;
    for (let i = 0; i < mealList.length; i++) {
      subtotal += parseFloat(totalMealPrice(mealList[i]));
    }
    return Number(subtotal.toFixed(2));
  };

  return isLoading ? (
    <span>En cours de chargement ...</span>
  ) : (
    <div className="app">
      <Header restaurant={data.restaurant} />

      <div className="container main">
        <div className="main__categories ">
          {data.categories.map((category, index) => {
            return (
              category.meals.length && (
                <Category key={index} category={category} addMeal={addMeal} />
              )
            );
          })}
        </div>
        {/* Component not displayed on phone */}
        <div className="no-phone">
          {sumSubTotal() === 0 ? (
            <div className="main__cart">
              <button className="btn--cart disabled">Valider mon panier</button>
              <p>Votre panier est vide</p>
            </div>
          ) : (
            <Cart
              mealList={mealList}
              handleQuantity={handleQuantity}
              totalMealPrice={totalMealPrice}
              sumSubTotal={sumSubTotal}
              deliverFee="2.5"
            />
          )}
        </div>
      </div>

      {/* Component displayed only on phone */}
      <div className="cart__phone">
        <button>Voir le panier</button>
        <Cart
          mealList={mealList}
          handleQuantity={handleQuantity}
          totalMealPrice={totalMealPrice}
          sumSubTotal={sumSubTotal}
        />
      </div>
    </div>
  );
}

export default App;
