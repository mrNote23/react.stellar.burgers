import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TDispatch, TRootState } from "@store/store";
import {
  closeUserData,
  loadUserData,
} from "@store/reducers/user-orders-reducer";
import { FeedOrderItem } from "@components/feed-order-item/feed-order-item";
import { PATH } from "@config/constants";
import Error from "@components/error/error";
import Loader from "@components/loader/loader";

const ProfileOrders = () => {
  const dispatch = useDispatch<TDispatch>();
  const { accessToken } = useSelector((store: TRootState) => store.user);
  const userOrders = useSelector((store: TRootState) => store.userOrders);

  useEffect(() => {
    if (!userOrders.connected) {
      dispatch(loadUserData(accessToken.split(" ")[1]));
    }
    return () => {
      dispatch(closeUserData());
    };
  }, [dispatch]);

  if (userOrders.message) {
    return <Error />;
  }

  return (
    <Fragment>
      {!userOrders || !userOrders.orders.length ? (
        <Loader />
      ) : (
        userOrders.orders.map((order) => (
          <FeedOrderItem
            key={order._id}
            order={order}
            target={PATH.PROFILE_ORDERS}
          />
        ))
      )}
    </Fragment>
  );
};

export default ProfileOrders;
