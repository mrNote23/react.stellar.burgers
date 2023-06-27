import ready from "@images/ready.png";
import { useSelector } from "react-redux";
import { TRootState } from "@store/store";
import Loader from "@components/loader/loader";

import styles from "./order-details.module.css";

const OrderDetails = () => {
  const order = useSelector((store: TRootState) => store.order);

  if (order.loading) {
    return <Loader />;
  }
  return (
    <>
      {order !== null && order.success ? (
        <div className="pl-5 pr-5 text-center">
          <p className={`${styles.orderId} text text_type_digits-large mb-1`}>
            {order.order.number}
          </p>
          <p className="text text_type_main-medium mb-5">
            идентификатор заказа
          </p>
          <p className="text text_type_main-large mb-5">{order.name}</p>
          <img src={ready} className={styles.ready} alt="Заказ подтвержден" />
          <p className="text text_type_main-default mt-15 mb-2">
            Ваш заказ начали готовить
          </p>
          <p className="text text_type_main-default text_color_inactive mb-10">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      ) : (
        <>
          <div className="pl-25 pr-25 text-center">
            <p className="text text_type_main-large mb-5">
              Что-то пошло не так...
            </p>
            <p className="text text_type_main-medium mb-5">
              Повторите заказ чуть позже
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
