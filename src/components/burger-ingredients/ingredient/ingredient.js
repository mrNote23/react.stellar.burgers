import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";

const Ingredient = (props) => {
  return (
    <div className={styles.item}>
      <Counter count={1} size="default" extraClass="m-5" />
      <img src={props.image} alt={props.name} className="ml-4 mr-4" />
      <div className={styles.price}>
        <span className="text text_type_digits-default pr-2">
          {props.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-small text-center">{props.name}</p>
    </div>
  );
};

export default Ingredient;
