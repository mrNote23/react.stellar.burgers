import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={`${styles.menu} pt-4 pb-4`}>
          <div className="d-flex w-100">
            <li className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <a href="#">
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default text_color_primary pl-2">
                  Конструктор
                </span>
              </a>
            </li>
            <li className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <a href="#">
                <ListIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive pl-2">
                  Лента заказов
                </span>
              </a>
            </li>
          </div>
          <li className={styles.logo}>
            <a href="#">
              <Logo />
            </a>
          </li>
          <div className="d-flex flex-end w-100">
            <li className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
              <a href="#">
                <ProfileIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive pl-2">
                  Личный кабинет
                </span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
