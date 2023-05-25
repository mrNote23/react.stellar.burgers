import { useEffect, useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import { TBurger, TIngredient } from "../../types";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";

const order = {
  id: "034536",
};

const BurgerConstructor = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [burger, setBurger] = useState<TBurger>({
    bun: null,
    filling: [],
  });

  const scrolledWindow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const onResize = () => {
    const maxHeight = Math.ceil((window.innerHeight - 600) / 96) * 96;
    (scrolledWindow.current as HTMLElement).style.maxHeight = `${
      maxHeight < 96 ? 96 : maxHeight
    }px`;
  };

  const [, dropIngredient] = useDrop({
    accept: "ingredient",
    drop: (item: { [key: string]: TIngredient }) => {
      addIngredient({ ...item.ingredient, _id: nanoid() });
    },
  });

  const addIngredient = (ingredient: TIngredient) => {
    if (ingredient.type === "bun") {
      setBurger({ ...burger, bun: { ...ingredient } });
    } else {
      setBurger({ ...burger, filling: [...burger.filling, ingredient] });
    }
  };

  const burgerEmpty = useMemo(
    () => !(burger.bun !== null || burger.filling.length > 0),
    // eslint-disable-next-line
    [burger]
  );

  const burgerPrice = useMemo(
    () =>
      !burgerEmpty
        ? burger.filling.reduce(
            (acc, item) => acc + item.price,
            burger.bun ? burger.bun.price * 2 : 0
          )
        : 0,
    // eslint-disable-next-line
    [burger]
  );

  const deleteIngredient = (ingredientId: string) => {
    setBurger({
      ...burger,
      filling: burger.filling.filter((item) => item._id !== ingredientId),
    });
  };

  return (
    <section className={styles.section} ref={dropIngredient}>
      <div className={styles.list}>
        {burger.bun && (
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
        )}
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
                handleClose={() => deleteIngredient(item._id)}
              />
            </div>
          ))}
        </div>
        {burger.bun && (
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
        )}
      </div>
      {!burgerEmpty && (
        <div className={styles.footer}>
          <span className="text text_type_digits-medium mr-2">
            {burgerPrice}
          </span>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="ml-10"
            onClick={() => setShowModal(true)}
          >
            Оформить заказ
          </Button>
        </div>
      )}
      <Modal visible={showModal} setVisible={setShowModal}>
        <OrderDetails order={order} />
      </Modal>
    </section>
  );
};

export default BurgerConstructor;
