import { Fragment } from "react";
import styles from "./page-profile.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../services/reducers/user";
import ProfileDetails from "./profile-details/profile-details";
import ProfileOrders from "./profile-orders/profile-orders";
import { TDispatch } from "../../services/store";
import { PATH } from "../../config/constants";

const PageProfile = () => {
  const dispatch = useDispatch<TDispatch>();
  const location = useLocation();

  const onLogout = () => {
    dispatch(userLogout());
  };

  const isOrders = location.pathname.indexOf(PATH.ORDERS) > 0;

  return (
    <Fragment>
      <section className={styles.section_menu}>
        <nav>
          <ul className={styles.menu}>
            <li>
              <NavLink
                className={`text text_type_main-default text_color_${
                  !isOrders ? "primary" : "inactive"
                }`}
                to={PATH.PROFILE}
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`text text_type_main-default text_color_${
                  isOrders ? "primary" : "inactive"
                }`}
                to={PATH.PROFILE_ORDERS}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text text_type_main-default text_color_inactive"
                onClick={onLogout}
                to=""
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive mt-25">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </section>
      <section className={styles.section_content}>
        {isOrders ? <ProfileOrders /> : <ProfileDetails />}
      </section>
    </Fragment>
  );
};

export default PageProfile;
