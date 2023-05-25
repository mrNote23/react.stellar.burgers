import { FC } from "react";
import { TOrder } from "../../types";
import ready from "../../images/ready.png";
import styles from "./order-details.module.css";

const OrderDetails: FC<{ order: TOrder }> = ({ order }) => {
  return (
    <>
      <div className="pl-25 pr-25 text-center">
        <p className={`${styles.orderId} text text_type_digits-large mb-8`}>
          {order.id}
        </p>
        <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
        <img src={ready} className={styles.ready} alt="Заказ подтвержден" />
        <p className="text text_type_main-default mt-15 mb-2">
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default text_color_inactive mb-10">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
