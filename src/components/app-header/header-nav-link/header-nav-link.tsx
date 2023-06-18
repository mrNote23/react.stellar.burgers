import styles from "./header-nav-link.module.css";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import { FC, useMemo } from "react";

const HeaderNavLink: FC<{ path: string; name: string }> = ({ path, name }) => {
  const location = useLocation();
  const activePath = useMemo(() => {
    if (path === location.pathname) {
      return true;
    } else return `_${location.pathname}`.indexOf(path) > 0 && path !== "/";
  }, [location.pathname, path]);

  return (
    <NavLink to={path} className={`${styles.link} pl-5 pr-5 pt-4 pb-4`}>
      <BurgerIcon type={`${activePath ? "primary" : "secondary"}`} />
      <span
        className={`text text_type_main-default text_color_${
          activePath ? "primary" : "inactive"
        } pl-2`}
      >
        {name}
      </span>
    </NavLink>
  );
};

export default HeaderNavLink;
