import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  return (
    <section className={styles.section}>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.drag}></div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
        <div className={styles.item}>
          <div className={styles.drag}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={874}
            thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
          />
        </div>
        <div className={styles.item}>
          <div className={styles.drag}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail="https://code.s3.yandex.net/react/code/meat-04.png"
          />
        </div>
        <div className={styles.item}>
          <div className={styles.drag}></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </div>
      <div className={styles.footer}>
        <span className="text text_type_digits-medium mr-2">610</span>
        <CurrencyIcon type="primary" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="ml-10"
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
