import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
      <p className="text text_type_main-small text_color_inactive mt-5">
        Загрузка данных...
      </p>
    </div>
  );
};

export default Loader;
