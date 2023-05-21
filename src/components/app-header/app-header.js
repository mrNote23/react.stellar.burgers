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
      <nav>
        <ul className="pt-4 pb-4">
          <div className="d-flex w-100">
            <li className="pr-5">
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default text_color_primary pl-2">
                Конструктор
              </span>
            </li>
            <li className="pl-5 pr-5">
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </span>
            </li>
          </div>
          <li>
            <Logo />
          </li>
          <div className="d-flex flex-end w-100">
            <li className="pl-5">
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">
                Личный кабинет
              </span>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
