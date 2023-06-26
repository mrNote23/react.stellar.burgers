import ingredients from "@store/reducers/ingredients-reducer";
import burger from "@store/reducers/burger-reducer";
import order from "@store/reducers/order-reducer";
import details from "@store/reducers/ingredient-details-reducer";
import user from "@store/reducers/user-reducer";

const rootReducer = { ingredients, burger, order, details, user };
export default rootReducer;
