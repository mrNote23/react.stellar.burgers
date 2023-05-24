import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/main-prop-types";
import { useDrag } from "react-dnd";

const Ingredient = ({ ingredient, onClick }) => {
  const [, dragIngredient] = useDrag({
    type: "ingredient",
    item: {
      ingredient,
    },
  });

  return (
    <div className={styles.item} onClick={onClick} ref={dragIngredient}>
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

Ingredient.propTypes = {
  ingredient: PropTypes.shape(ingredientType).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Ingredient;
