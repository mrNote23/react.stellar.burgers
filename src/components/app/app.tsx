import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Error from "../error/error";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TRootState } from "../../services/store";
import { loadIngredients } from "../../services/reducers/ingredients";

const App = () => {
  const { ingredients, loading, error } = useSelector(
    (store: TRootState) => store.ingredients
  );

  const dispatch = useDispatch<TDispatch>();

  useEffect(() => {}, [ingredients, loading, error]);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!error ? (
        <BrowserRouter>
          <AppHeader />
          <DndProvider backend={HTML5Backend}>
            <main className="container">
              <BurgerIngredients />
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
