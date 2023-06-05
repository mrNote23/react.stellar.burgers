import { useEffect, useMemo, useRef } from "react";
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
import { useModal } from "../../hooks/use-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  burgerAddIngredient,
  burgerClearIngredients,
  burgerRemoveIngredient,
  burgerSwapIngredients,
} from "../../services/reducers/burger";
import {
  ingredientCounterDec,
  ingredientCounterInc,
  ingredientsCountersReset,
} from "../../services/reducers/ingredients";
import { orderCreate } from "../../services/reducers/order";
import { TDispatch, TRootState } from "../../services/store";

const BurgerConstructor = () => {
  const dispatch = useDispatch<TDispatch>();

  const burger: TBurger = useSelector((store: TRootState) => store.burger);
  const loading = useSelector((store: TRootState) => store.order.loading);

  const { isModalOpen, openModal, closeModal } = useModal(false);

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
      if (item.ingredient.type === "bun" && burger.bun) {
        dispatch(ingredientCounterDec(burger.bun._id));
      }
      dispatch(burgerAddIngredient({ ...item.ingredient, id: nanoid() }));
      dispatch(ingredientCounterInc(item.ingredient._id));
    },
  });

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
    dispatch(burgerRemoveIngredient(tmpId));
    dispatch(ingredientCounterDec(ingredientId));
  };

  const swapIngredients = (first: number, second: number) => {
    dispatch(burgerSwapIngredients({ first, second }));
  };

  const createOrder = () => {
    let tmp = burger.bun ? [burger.bun._id, burger.bun._id] : [];
    tmp = [...tmp, ...burger.filling.map((item) => item._id)];

    dispatch(orderCreate(tmp));
    dispatch(burgerClearIngredients());
    dispatch(ingredientsCountersReset());
    openModal();
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
      {isModalOpen && !loading && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
