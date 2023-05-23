import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { Link } from "react-router-dom";

const Ingredient = ({ ingredient, onClick }) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <Link to="/">
        <Counter count={1} size="default" extraClass="m-5" />
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="ml-4 mr-4"
        />
        <div className={styles.price}>
          <span className="text text_type_digits-default pr-2">
            {ingredient.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small text-center">
          {ingredient.name}
        </p>
      </Link>
    </div>
  );
};

export default Ingredient;
