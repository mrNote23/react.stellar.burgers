import { FC, Fragment } from "react";
import { TWsOrdersListPrepared } from "@config/types";
import { OrderStatus } from "@config/constants";
import { numberWithSpaces } from "@utils/number-with-spaces";
import Loader from "@components/loader/loader";
import styles from "./feed-info.module.css";

export const FeedInfo: FC<{ feed: TWsOrdersListPrepared }> = ({ feed }) => {
  const OrdersList: FC<{ type: OrderStatus[] }> = ({ type }) => {
    const orders = feed.orders
      .filter((order) => type.includes(order.status))
      .slice(0, 10);

    return (
      <ul
        className={`text text_type_digits-default ${
          type.includes(OrderStatus.done) && "text_color_success"
        }`}
      >
        {orders.map((order) => (
          <li key={order._id}>{order.number}</li>
        ))}
      </ul>
    );
  };
  return (
    <Fragment>
      {!feed || !feed.orders.length ? (
        <Loader />
      ) : (
        <Fragment>
          <div className={styles.orders}>
            <div className="w-100 mr-4">
              <p className="text text_type_main-medium pb-6">Готовы:</p>
              <OrdersList type={[OrderStatus.done]} />
            </div>
            <div className="w-100 ml-4">
              <p className="text text_type_main-medium pb-6">В работе:</p>
              <OrdersList type={[OrderStatus.created, OrderStatus.pending]} />
            </div>
          </div>
          <div className={styles.feed_info}>
            <p className="text text_type_main-medium pt-15">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-large">
              <span>{numberWithSpaces(feed.total)}</span>
            </p>
            <p className="text text_type_main-medium pt-15">
              Выполнено за сегодня:
            </p>
            <p className="text text_type_digits-large">
              <span>{numberWithSpaces(feed.totalToday)}</span>
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
