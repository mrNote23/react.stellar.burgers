import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { TWsOrderPrepared } from "@config/types";
import { OrderStatus, OrderStatusTitle } from "@config/constants";
import { dateConvert } from "@utils/date-convert";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FeedOrderImages } from "@components/feed-order-item/feed-order-images/feed-order-images";
import styles from "./feed-order-item.module.css";

export const FeedOrderItem: FC<{
  order: TWsOrderPrepared;
  target: string;
  showStatus?: boolean;
}> = ({ order, target, showStatus = true }) => {
  const location = useLocation();

  return (
    <Link
      to={`${target}/${order.number}`}
      className={styles.order_item}
      state={{ prevLocation: location }}
    >
      <div className={styles.header}>
        <p className="text text_type_digits-default text_color_primary">
          #{order.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {dateConvert(order.createdAt)}
        </p>
      </div>
      <p className="text text_type_main-medium text_color_primary pb-2">
        {order.name}
      </p>
      {showStatus && (
        <p
          className={`text text_type_main-default ${
            order.status === OrderStatus.done
              ? "text_color_success"
              : "text_color_primary"
          } pb-6`}
        >
          {OrderStatusTitle[order.status]}
        </p>
      )}
      <div className={styles.footer}>
        <FeedOrderImages ingredients={order.ingredients} />
        <div className={styles.total_price}>
          <p className="text text_type_digits-default text_color_primary mr-2">
            {order.totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
