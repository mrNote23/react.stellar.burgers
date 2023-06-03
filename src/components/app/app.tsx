import { useEffect, useReducer, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TIngredient } from "../../types";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Error from "../error/error";
import Api from "../../utils/api";
import Loader from "../loader/loader";
import { IngredientsContext } from "../../services/ingredients-context";
import { ingredientsReducer } from "../../services/ingredients-reducer";

type TState = {
  loading: boolean;
  error: boolean;
};

type TResponse = {
  success: boolean;
  data: TIngredient[];
};

const App = () => {
  const [state, setState] = useState<TState>({
    loading: true,
    error: false,
  });

  const [data, dispatchIngredients] = useReducer(ingredientsReducer, []);

  useEffect(() => {
    Api.loadIngredients()
      .then((data: TResponse | unknown) => {
        dispatchIngredients({
          type: "set",
          payload: (data as TResponse).data,
        });
        setState((prev) => ({
          ...prev,
          loading: false,
        }));
      })
      .catch(() =>
        setState((prev: TState) => ({ ...prev, error: true, loading: false }))
      );
  }, []);

  if (state.loading) {
    return <Loader />;
  }

  return (
    <>
      {!state.error ? (
        <BrowserRouter>
          <AppHeader />
          <IngredientsContext.Provider value={{ data, dispatchIngredients }}>
            <DndProvider backend={HTML5Backend}>
              <main className="container">
                <BurgerIngredients />
                <BurgerConstructor />
              </main>
            </DndProvider>
          </IngredientsContext.Provider>
        </BrowserRouter>
      ) : (
        <Error />
      )}
    </>
  );
};

export default App;
