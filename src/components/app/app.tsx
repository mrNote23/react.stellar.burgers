import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/store";
import { userAuthorize } from "@store/reducers/user-reducer";
import { loadIngredients } from "@store/reducers/ingredients-reducer";
import PageError from "@pages/page-error/page-error";
import Router from "@components/router/router";
import Loader from "@components/loader/loader";

const App = () => {
  const { loading, error } = useAppSelector((store) => store.ingredients);
  const { authProcess } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userAuthorize());
    dispatch(loadIngredients());
  }, [dispatch]);

  if (loading || authProcess) {
    return <Loader />;
  }
  return <BrowserRouter>{!error ? <Router /> : <PageError />}</BrowserRouter>;
};

export default App;
