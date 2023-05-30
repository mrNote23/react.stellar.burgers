import { useEffect, useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import { TBurger, TIngredient } from "../../types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";

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
      setBurger((prev) => ({ ...prev, bun: { ...ingredient } }));
    } else {
      setBurger((prev) => ({
        ...prev,
        filling: [...burger.filling, ingredient],
      }));
    }
  };

  const burgerEmpty = useMemo(
    () => !(burger.bun !== null || burger.filling.length > 0),
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
    [burger, burgerEmpty]
  );

  const deleteIngredient = (ingredientId: string) => {
    setBurger({
      ...burger,
      filling: burger.filling.filter((item) => item._id !== ingredientId),
    });
  };

  const swapIngredients = (first: number, second: number) => {
    const tmp = [...burger.filling];
    [tmp[first], tmp[second]] = [tmp[second], tmp[first]];
    setBurger({ ...burger, filling: [...tmp] });
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
            <BurgerConstructorItem
              ingredient={item}
              onDelete={deleteIngredient}
              index={index}
              key={index}
              onSwap={swapIngredients}
            />
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
