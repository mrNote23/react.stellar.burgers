import { FC } from "react";
import { TOriginalIngredient } from "@config/types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-info-row.module.css";

export const OrderInfoRow: FC<{ data: TOriginalIngredient }> = ({ data }) => {
  return (
    <li className={styles.row}>
      <div className="d-flex items-center">
        <div className={styles.image_container}>
          <div className={styles.image}>
            <img src={data.image_mobile} alt={data.name} />
          </div>
        </div>
        <p className="text text_type_main-default ml-4">{data.name}</p>
      </div>
      <p className="text text_type_main-medium d-flex items-center">
        <span className="mr-3">
          {data.qty} x {data.price}
        </span>
        <CurrencyIcon type="primary" />
      </p>
    </li>
  );
};
