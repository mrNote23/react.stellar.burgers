import styles from "./error.module.css";
const Error = () => {
  return (
    <div className={styles.error}>
      <p className="text text_type_main-large">
        Не получается установить связь с базой...
      </p>
      <p className="text text_type_main-medium mt-5">Повторите попытку позже</p>
    </div>
  );
};

export default Error;
