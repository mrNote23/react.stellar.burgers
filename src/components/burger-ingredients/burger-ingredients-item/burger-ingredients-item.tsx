import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import { TIngredient } from "@config/types";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-ingredients-item.module.css";

type TBurgerIngredientsItemProps = {
  ingredient: TIngredient;
};

const BurgerIngredientsItem: FC<TBurgerIngredientsItemProps> = ({
  ingredient,
}) => {
  const location = useLocation();
  const [{ isDragging }, dragIngredient, dragPreview] = useDrag({
    type: "ingredient",
    item: {
      ingredient,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={`${styles.item} ${isDragging ? styles.dragging : ""}`}
      ref={dragIngredient}
    >
      <Link
        className="text_color_primary"
        to={`/ingredients/${ingredient._id}`}
        state={{ prevLocation: location }}
      >
        {ingredient.include ? (
          <Counter count={ingredient.include} size="default" extraClass="m-5" />
        ) : null}
        <img
          ref={dragPreview}
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

export default BurgerIngredientsItem;
