import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TRootState } from "@store/store";
import { userAuthorize } from "@store/reducers/user-reducer";
import { loadIngredients } from "@store/reducers/ingredients-reducer";
import PageError from "@pages/page-error/page-error";
import Router from "@components/router/router";
import Loader from "@components/loader/loader";

const App = () => {
  const { loading, error } = useSelector(
    (store: TRootState) => store.ingredients
  );

  const { authProcess } = useSelector((store: TRootState) => store.user);
  const dispatch = useDispatch<TDispatch>();

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
