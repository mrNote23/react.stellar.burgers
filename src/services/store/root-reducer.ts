import ingredients from "@store/reducers/ingredients-reducer";
import burger from "@store/reducers/burger-reducer";
import order from "@store/reducers/order-reducer";
import details from "@store/reducers/ingredient-details-reducer";
import user from "@store/reducers/user-reducer";
import feed from "@store/reducers/feed-reducer";
import userOrders from "@store/reducers/user-orders-reducer";

const rootReducer = {
  ingredients,
  burger,
  order,
  details,
  user,
  feed,
  userOrders,
};
export default rootReducer;
