import { useEffect, useState } from "react";
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

type TState = {
  loading: boolean;
  error: boolean;
  data: TIngredient[];
};

type TResponse = {
  success: boolean;
  data: TIngredient[];
};

const App = () => {
  const [state, setState] = useState<TState>({
    loading: true,
    error: false,
    data: [],
  });

  useEffect(() => {
    Api.loadIngredients()
      .then((data: TResponse | unknown) => {
        if ((data as TResponse).success) {
          setState((prev) => ({
            ...prev,
            data: (data as TResponse).data,
            loading: false,
          }));
        } else {
          setState((prev: TState) => ({
            ...prev,
            error: true,
            loading: false,
          }));
        }
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
          <IngredientsContext.Provider value={state.data}>
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
