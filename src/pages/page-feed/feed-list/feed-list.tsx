import { FC, Fragment } from "react";
import { TWsOrderPrepared } from "@config/types";
import { FeedOrderItem } from "@components/feed-order-item/feed-order-item";
import { PATH } from "@config/constants";
import Loader from "@components/loader/loader";

export const FeedList: FC<{ orders: TWsOrderPrepared[] }> = ({ orders }) => {
  return (
    <Fragment>
      {!orders || !orders.length ? (
        <Loader />
      ) : (
        orders.map((order) => (
          <FeedOrderItem
            key={order._id}
            order={order}
            showStatus={false}
            target={PATH.FEED}
          />
        ))
      )}
    </Fragment>
  );
};
