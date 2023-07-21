import { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { userLogout } from "@store/reducers/user-reducer";
import { PATH } from "@config/constants";
import { useAppDispatch } from "@store/store";
import ProfileOrders from "@pages/page-profile/profile-orders/profile-orders";
import ProfileDetails from "@pages/page-profile/profile-details/profile-details";
import styles from "./page-profile.module.css";

const PageProfile = () => {
  const dispatch = useAppDispatch();
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
