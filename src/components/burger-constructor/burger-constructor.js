import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useEffect, useMemo, useRef } from "react";
import { burger } from "../../utils/burger";

const BurgerConstructor = () => {
  const scrolledWindow = useRef();

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

  const burgerPrice = useMemo(
    () =>
      burger.filling.reduce(
        (acc, item) => acc + item.price,
        burger.bun.price || 0
      ),
    [burger]
  );

  return (
    <section className={styles.section}>
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.drag}></div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${burger.bun.name} (верх)`}
            price={burger.bun.price}
            thumbnail={burger.bun.image}
          />
        </div>
        <div className={styles.scrolled} ref={scrolledWindow}>
          {burger.filling.map((item, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.drag}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>

        <div className={styles.item}>
          <div className={styles.drag}></div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${burger.bun.name} (низ)`}
            price={burger.bun.price}
            thumbnail={burger.bun.image}
          />
        </div>
      </div>
      <div className={styles.footer}>
        <span className="text text_type_digits-medium mr-2">{burgerPrice}</span>
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
