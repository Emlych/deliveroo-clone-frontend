import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Category from "./Components/Category";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    <span>En cours de chargement ...</span>
  ) : (
    <div className="app">
      <Header
        restaurantName={data.restaurant.name}
        restaurantDescription={data.restaurant.description}
        imgSrc={data.restaurant.picture}
      />

      <div className="container main">
        <div className="main__categories">
          {data.categories.map((item, index) => {
            return <Category categoryName={item.name} meals={item.meals} />;
          })}
        </div>
        <div className="main__cart">cart item</div>
      </div>
    </div>
  );
}

export default App;
