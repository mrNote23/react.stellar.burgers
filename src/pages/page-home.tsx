import { Fragment } from "react";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

const PageHome = () => {
  return (
    <Fragment>
      <BurgerIngredients />
      <BurgerConstructor />
    </Fragment>
  );
};

export default PageHome;
