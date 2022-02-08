import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Category from "./Components/Category";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [mealList, setMealList] = useState([]);
  const [subtotal, setsubtotal] = useState(0);

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
        price: meal.price,
      };
      newMealList.push(newMeal);
    } else {
      for (let i = 0; i < newMealList.length; i++) {
        if (meal.id === newMealList[i].id) {
          newMealList[i] = {
            id: meal.id,
            quantity: newMealList[i].quantity + 1,
            title: meal.title,
            price: (Number(meal.price) + Number(newMealList[i].price)).toFixed(
              2
            ),
          };
        }
      }
    }
    setMealList(newMealList);
    sumSubTotal();
  };

  //increment or decrement meal quantity in cart
  const handleQuantity = (index, calculation) => {
    const newMealList = [...mealList];
    //Récupérer prix unitaire pour identifiant newMealList[index].id
    // pour sortir l'objet dont Parcourir data.categories.meals[id] === newMealList[index].id
    let unitPrice = 0;
    for (let i = 0; i < data.categories.length; i++) {
      // console.log(data.categories[i].meals);
      for (let j = 0; j < data.categories[i].meals.length; j++) {
        // console.log(data.categories[i].meals[j].id);
        if (data.categories[i].meals[j].id === newMealList[index].id) {
          unitPrice = data.categories[i].meals[j].price;
        }
      }
    }

    if (calculation === "decrement") {
      if (newMealList[index].quantity === 1) {
        return; //later manage delete with this line
      } else {
        newMealList[index].quantity -= 1;
      }
    }
    if (calculation === "increment") {
      newMealList[index].quantity += 1;
    }
    newMealList[index].price = unitPrice * newMealList[index].quantity;
    setMealList(newMealList);
    sumSubTotal();
  };

  //calculate subtotal
  const sumSubTotal = () => {
    mealList.map((item) => {
      let subtotal = 0;
      return (subtotal += Number(item.price));
    });
    setsubtotal(subtotal);
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
          <button className="btn--cart">Valider mon panier</button>
          <div className="meallist">
            {mealList.map((item, index) => {
              return (
                <div className="cart--line" key={index}>
                  <div className="cart--quantity">
                    <div
                      className="handleQuantity"
                      onClick={() => handleQuantity(index, "decrement")}
                    >
                      -
                    </div>
                    <div className="quantity"> {item.quantity}</div>
                    <div
                      className="handleQuantity"
                      onClick={() => handleQuantity(index, "increment")}
                    >
                      +
                    </div>
                  </div>
                  <div className="cart--title">{item.title}</div>
                  <div className="cart--price">{item.price} €</div>
                </div>
              );
            })}
          </div>
          <div className="subtotal">
            <div className="subtotal--line">
              <div className="subtotal-text">Sous-total</div>
              <div className="subtotal-price">{subtotal}</div>
            </div>
            <div className="subtotal--line">
              <div className="subtotal-text">Frais de livraison</div>
              <div className="subotal-price">2.50 €</div>
            </div>
          </div>
          <div className="subtotal--line">
            <div className="total-text">Total</div>
            <div className="total-price">{subtotal + 2.5} €</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
