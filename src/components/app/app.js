import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Error from "../error/error";
import Api from "../../utils/api";
import Loader from "../loader/loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const [state, setState] = useState({
    loading: true,
    error: false,
    data: [],
  });

  useEffect(
    () => {
      Api.loadIngredients()
        .then((data) => {
          if (data.success) {
            setState({ ...state, data: data.data, loading: false });
          } else {
            setState({ ...state, error: true, loading: false });
          }
        })
        .catch(() => setState({ ...state, error: true, loading: false }));
    },
    // eslint-disable-next-line
    []
  );

  if (state.loading) {
    return <Loader />;
  }

  return (
    <>
      {!state.error ? (
        <BrowserRouter>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <main className="container">
              <BurgerIngredients data={state.data} />
              <BurgerConstructor />
            </main>
          </DndProvider>
        </BrowserRouter>
      ) : (
        <Error />
      )}
    </>
  );
};

export default App;
