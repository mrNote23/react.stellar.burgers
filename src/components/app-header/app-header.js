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
            <li>
              <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                <BurgerIcon type="primary" />
                <span className="text text_type_main-default text_color_primary pl-2">
                  Конструктор
                </span>
              </a>
            </li>
            <li>
              <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
                <ListIcon type="secondary" />
                <span className="text text_type_main-default text_color_inactive pl-2">
                  Лента заказов
                </span>
              </a>
            </li>
          </div>
          <li>
            <a href="#" className={styles.logo}>
              <Logo />
            </a>
          </li>
          <div className="d-flex flex-end w-100">
            <li>
              <a href="#" className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
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
