import { Link, useLocation } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { useCallback } from "react";

const AppHeader = () => {
  const location = useLocation();
  const currentPath = useCallback(() => {
    const { pathname } = location;
    switch (true) {
      case pathname === "/":
        return "home";
      case !!pathname.match(/feed/gi):
        return "feed";
      case !!pathname.match(/profile/gi):
        return "profile";
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={`${styles.menu} pt-4 pb-4`}>
          <div className="d-flex w-100">
            <li>
              <Link to="/" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                <BurgerIcon
                  type={`${currentPath() === "home" ? "primary" : "secondary"}`}
                />
                <span
                  className={`text text_type_main-default text_color_${
                    currentPath() === "home" ? "primary" : "inactive"
                  } pl-2`}
                >
                  Конструктор
                </span>
              </Link>
            </li>
            <li>
              <Link to="/feed" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                <ListIcon
                  type={`${currentPath() === "feed" ? "primary" : "secondary"}`}
                />
                <span
                  className={`text text_type_main-default text_color_${
                    currentPath() === "feed" ? "primary" : "inactive"
                  } pl-2`}
                >
                  Лента заказов
                </span>
              </Link>
            </li>
          </div>
          <li>
            <Link to="/" className={styles.logo}>
              <Logo />
            </Link>
          </li>
          <div className="d-flex flex-end w-100">
            <li>
              <Link
                to="/profile"
                className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}
              >
                <ProfileIcon
                  type={`${
                    currentPath() === "profile" ? "primary" : "secondary"
                  }`}
                />
                <span
                  className={`text text_type_main-default text_color_${
                    currentPath() === "profile" ? "primary" : "inactive"
                  } pl-2`}
                >
                  Личный кабинет
                </span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
