import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../error/error";

const API = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setError(true);
          return;
        }
        setData(data.data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <>
      {!error ? (
        <BrowserRouter>
          <AppHeader />
          <main className="container">
            <BurgerIngredients data={data} />
            <BurgerConstructor data={data} />
          </main>
        </BrowserRouter>
      ) : (
        <Error />
      )}
    </>
  );
}

export default App;
