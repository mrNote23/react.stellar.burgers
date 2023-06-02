import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import { TBurger, TIngredient, TOrder } from "../../types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./burger-constructor.module.css";
import BurgerConstructorItem from "./burger-constructor-item/burger-constructor-item";
import Api from "../../utils/api";
import { IngredientsContext } from "../../services/ingredients-context";

const emptyBurger = {
  bun: null,
  filling: [],
};

const BurgerConstructor = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [burger, setBurger] = useState<TBurger>(emptyBurger);

  const [order, setOrder] = useState<TOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const scrolledWindow = useRef<HTMLDivElement>(null);

  const { dispatchIngredients } = useContext(IngredientsContext);

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
      addIngredient({ ...item.ingredient, id: nanoid() });
    },
  });

  const addIngredient = (ingredient: TIngredient) => {
    if (ingredient.type === "bun") {
      if (burger.bun) {
        dispatchIngredients({
          type: "remove",
          payload: { id: burger.bun._id, quantity: 2 },
        });
      }
      dispatchIngredients({
        type: "add",
        payload: { id: ingredient._id, quantity: 2 },
      });
      setBurger((prev) => ({ ...prev, bun: { ...ingredient } }));
    } else {
      dispatchIngredients({
        type: "add",
        payload: { id: ingredient._id, quantity: 1 },
      });
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

  const deleteIngredient = (ingredientId: string, tmpId: string) => {
    dispatchIngredients({
      type: "remove",
      payload: { id: ingredientId, quantity: 1 },
    });
    setBurger({
      ...burger,
      filling: burger.filling.filter((item) => item.id !== tmpId),
    });
  };

  const swapIngredients = (first: number, second: number) => {
    const tmp = [...burger.filling];
    [tmp[first], tmp[second]] = [tmp[second], tmp[first]];
    setBurger({ ...burger, filling: [...tmp] });
  };

  const createOrder = () => {
    setLoading(true);
    let tmp = burger.bun ? [burger.bun._id, burger.bun._id] : [];
    tmp = [...tmp, ...burger.filling.map((item) => item._id)];
    Api.createOrder({ ingredients: tmp })
      .then((data) => {
        if ((data as TOrder).success) {
          setOrder(data as TOrder);
          setBurger(emptyBurger);
          dispatchIngredients({ type: "reset" });
        } else {
          setOrder({ success: false });
        }
        setShowModal(true);
        setLoading(false);
      })
      .catch(() => {
        setOrder({ success: false });
        setShowModal(true);
        setLoading(false);
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
            onClick={createOrder}
            disabled={loading}
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
