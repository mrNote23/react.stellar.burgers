import { useEffect } from "react";
import { BrowserRouter, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TRootState } from "../../services/store";
import { loadIngredients } from "../../services/reducers/ingredients";
import Router from "../router/router";
import Loader from "../loader/loader";

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
    <BrowserRouter>
      {!error ? <Router /> : <Navigate to="/error" />}
    </BrowserRouter>
  );
};

export default App;
