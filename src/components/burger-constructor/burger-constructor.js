import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useEffect, useRef } from "react";

const BurgerConstructor = () => {
  const scrolledWindow = useRef();

  const mas = new Array(50).fill(null);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onResize = () => {
    const maxHeight = Math.ceil((window.innerHeight - 600) / 96) * 96;
    scrolledWindow.current.style.maxHeight = `${
      maxHeight < 96 ? 96 : maxHeight
    }px`;
  };

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
        <div className={styles.scrolled} ref={scrolledWindow}>
          {mas.map((item, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.drag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text="Плоды Фалленианского дерева"
                price={874}
                thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
              />
            </div>
          ))}
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
