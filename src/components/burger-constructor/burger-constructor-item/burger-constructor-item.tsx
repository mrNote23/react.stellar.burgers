import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burger-constructor.module.css";
import { FC } from "react";
import { TIngredient } from "../../../types";

const BurgerConstructorItem: FC<{
  ingredient: TIngredient;
  onDelete: (id: string) => void;
  index: number;
}> = ({ ingredient, onDelete, index }) => {
  return (
    <div className={styles.item}>
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
