import { FC } from "react";

import styles from "./loader.module.css";

const Loader: FC<{ simple?: boolean }> = ({ simple }) => {
  return (
    <>
      {simple ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
          <p className="text text_type_main-small text_color_inactive mt-5">
            Загрузка данных...
          </p>
        </div>
      )}
    </>
  );
};

export default Loader;
