import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TRootState } from "../../services/store";
import { loadIngredients } from "../../services/reducers/ingredients";
import Router from "../router/router";
import Loader from "../loader/loader";
import PageError from "../../pages/page-error";
import { userAuthorize } from "../../services/reducers/user";

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
