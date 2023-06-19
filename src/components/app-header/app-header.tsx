import { NavLink } from "react-router-dom";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderNavLink from "./header-nav-link/header-nav-link";
import { PATH } from "../../config/constants";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={`${styles.menu} pt-4 pb-4`}>
          <div className="d-flex w-100">
            <li>
              <HeaderNavLink path={PATH.HOME} name="Конструктор" />
            </li>
            <li>
              <HeaderNavLink path={PATH.FEED} name="Лента заказов" />
            </li>
          </div>
          <li>
            <NavLink to={PATH.HOME} className={styles.logo}>
              <Logo />
            </NavLink>
          </li>
          <div className="d-flex flex-end w-100">
            <li>
              <HeaderNavLink path={PATH.PROFILE} name="Личный кабинет" />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
