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
  const [openCart, setOpenCart] = useState(false);

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

    //Less DRY code to add meal:
    // let newMeal = {};
    // if (!newMealList.length ||!newMealList.some((item) => item.id === meal.id)) {
    //   newMeal = {
    //     id: meal.id,
    //     quantity: 1,
    //     title: meal.title,
    //     price: Number(meal.price),
    //   };
    //   newMealList.push(newMeal);
    // } else {
    //   for (let i = 0; i < newMealList.length; i++) {
    //     if (meal.id === newMealList[i].id) newMealList[i].quantity++;
    //   }
    // }

    //More DRY code to add meal:
    const exist = newMealList.find((elem) => elem.id === meal.id);
    if (exist) {
      exist.quantity++;
    } else {
      meal.quantity = 1;
      newMealList.push(meal);
    }
    setMealList(newMealList);
  };

  //increment or decrement meal quantity in cart
  const handleQuantity = (index, calculation) => {
    const newMealList = [...mealList];
    if (calculation === "decrement") {
      if (newMealList[index].quantity === 1) {
        newMealList.splice(index, 1); //remove element from list when < 1
      } else {
        newMealList[index].quantity -= 1;
      }
    }
    if (calculation === "increment") newMealList[index].quantity += 1;

    setMealList(newMealList);
  };
  //calcul total price per type of meal
  const totalMealPrice = (item) => {
    return (Number(item.price) * item.quantity).toFixed(2);
  };

  let subtotal = 0;
  mealList.forEach((item) => {
    subtotal = subtotal + Number(item.price) * item.quantity;
  });

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
          {subtotal === 0 ? (
            <div className="main__cart empty">
              <button className="btn--cart disabled">Valider mon panier</button>
              <p>Votre panier est vide</p>
            </div>
          ) : (
            <Cart
              mealList={mealList}
              handleQuantity={handleQuantity}
              totalMealPrice={totalMealPrice}
              subtotal={subtotal}
              deliverFee="2.5"
            />
          )}
        </div>
      </div>

      {/* Component displayed only on phone */}
      <div className="cart__phone">
        <button onClick={() => setOpenCart(!openCart)}>
          Voir le panier {openCart}
        </button>
        <Cart
          mealList={mealList}
          handleQuantity={handleQuantity}
          totalMealPrice={totalMealPrice}
          subtotal={subtotal}
          deliverFee="2.5"
        />
      </div>
    </div>
  );
}

export default App;
