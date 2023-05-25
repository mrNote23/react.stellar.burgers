import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import { FC, useRef } from "react";
import { TIngredient } from "../../../types";
import { useDrag, useDrop } from "react-dnd";

const BurgerConstructorItem: FC<{
  ingredient: TIngredient;
  onDelete: (id: string) => void;
  index: number;
  onSwap: (first: number, second: number) => void;
}> = ({ ingredient, onDelete, index, onSwap }) => {
  const ingredientRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "item",
    hover(item: { index: number }, monitor) {
      if (item.index === index) {
        return;
      }
      onSwap(item.index, index);
      item.index = index;
    },
  });

  const [, drag] = useDrag({
    type: "item",
    item: { index },
  });

  drag(drop(ingredientRef));

  return (
    <div className={`${styles.item} cursor-grab`} ref={ingredientRef}>
      <div className={styles.drag}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onDelete(ingredient._id)}
      />
    </div>
  );
};

export default BurgerConstructorItem;
