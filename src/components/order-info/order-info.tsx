import { FC, Fragment, useEffect, useState } from "react";
import { TWsOrderPrepared, TWsOrdersList } from "@config/types";
import { ordersListPrepare } from "@utils/orders-list-prepare";
import { OrderStatus, OrderStatusTitle } from "@config/constants";
import { dateConvert } from "@utils/date-convert";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderInfoRow } from "@components/order-info/order-info-row/order-info-row";
import Api from "@utils/api";
import Loader from "@components/loader/loader";
import styles from "./order-info.module.css";

export const OrderInfo: FC<{ orderId: number | null }> = ({ orderId }) => {
  const [order, setOrder] = useState<TWsOrderPrepared | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      Api.loadOrderInfo(+orderId)
        .then((res) => {
          setLoading(false);
          const tmp = ordersListPrepare(res as TWsOrdersList);
          if (tmp.success && tmp.orders.length) {
            setOrder(tmp.orders[0]);
          } else {
            setError("Ошибка связи с базой...");
          }
        })
        .catch(() => {
          setLoading(false);
          setError("Ошибка связи с базой...");
        });
    } else {
      setError("Ошибка связи с базой...");
    }
  }, [orderId]);

  return (
    <Fragment>
      {loading && <Loader />}
      {error && (
        <div className={styles.container}>
          <p className="text text_type_main-medium text_color_inactive m-10 text-center">
            {error}
          </p>
        </div>
      )}
      {order && !error && (
        <div className={styles.container}>
          <p className="text text_type_main-medium mt-10">{order.name}</p>
          <p
            className={`text text_type_main-default mt-3 ${
              order.status === OrderStatus.done && "text_color_success"
            }`}
          >
            {OrderStatusTitle[order.status]}
          </p>
          <p className="text text_type_main-medium mt-15">Состав:</p>
          <ul className={styles.ingredients}>
            {order.ingredients.map((item) => (
              <OrderInfoRow key={item._id} data={item} />
            ))}
          </ul>
          <div className={styles.total}>
            <span className="text text_type_main-default text_color_inactive">
              {dateConvert(order.createdAt)}
            </span>
            <div className={styles.total_price}>
              <p className="text text_type_digits-default text_color_primary mr-2">
                {order.totalPrice}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
