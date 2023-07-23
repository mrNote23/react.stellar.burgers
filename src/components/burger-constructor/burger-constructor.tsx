import { useEffect, useMemo, useRef } from "react";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import { TBurger, TIngredient } from "@config/types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "@components/modal/modal";
import OrderDetails from "@components/order-details/order-details";
import { useModal } from "@hooks/use-modal";
import {
  burgerAddIngredient,
  burgerClearIngredients,
  burgerLock,
  burgerRemoveIngredient,
  burgerSwapIngredients,
} from "@store/reducers/burger-reducer";
import {
  ingredientCounterDec,
  ingredientCounterInc,
  ingredientsCountersReset,
} from "@store/reducers/ingredients-reducer";
import { orderClear, orderCreate } from "@store/reducers/order-reducer";
import { useAppDispatch, useAppSelector } from "@store/store";
import { useNavigate } from "react-router-dom";
import { PATH } from "@config/constants";
import BurgerConstructorItem from "@components/burger-constructor/burger-constructor-item/burger-constructor-item";

import styles from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();

  const burger: TBurger = useAppSelector((store) => store.burger);
  const { loading, success } = useAppSelector((store) => store.order);
  const { authorized } = useAppSelector((store) => store.user);

  const { isModalOpen, openModal, closeModal } = useModal(false);

  const scrolledWindow = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(burgerClearIngredients());
      dispatch(ingredientsCountersReset());
      !isModalOpen && openModal();
    }
  }, [success, dispatch, isModalOpen, openModal]);

  const onResize = () => {
    const maxHeight = Math.ceil((window.innerHeight - 600) / 96) * 96;
    (scrolledWindow.current as HTMLElement).style.maxHeight = `${
      maxHeight < 96 ? 96 : maxHeight
    }px`;
  };

  const [{ isHover }, dropIngredient] = useDrop({
    accept: "ingredient",
    drop: (item: { [key: string]: TIngredient }) => {
      if (item.ingredient.type === "bun" && burger.bun) {
        dispatch(ingredientCounterDec(burger.bun._id));
      }
      dispatch(burgerAddIngredient({ ...item.ingredient, id: nanoid() }));
      dispatch(ingredientCounterInc(item.ingredient._id));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
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
    if (authorized) {
      let tmp = burger.bun ? [burger.bun._id, burger.bun._id] : [];
      tmp = [...tmp, ...burger.filling.map((item) => item._id)];
      dispatch(burgerLock());
      dispatch(orderCreate(tmp));
      openModal();
    } else {
      navigate(PATH.LOGIN);
    }
  };

  return (
    <section className={styles.section} ref={dropIngredient}>
      <div className={`${styles.list} ${isHover ? styles.target : ""}`}>
        {burger.bun ? (
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
        ) : (
          <div className={styles.item}>
            <div className={styles.empty_bun_top}>
              <p className="text text_type_main-default text_color_inactive">
                Перетащите булку
              </p>
            </div>
          </div>
        )}
        <div className={styles.scrolled} ref={scrolledWindow}>
          {burger.filling.length ? (
            burger.filling.map((item, index) => (
              <BurgerConstructorItem
                ingredient={item}
                onDelete={deleteIngredient}
                index={index}
                // уникальный id - генерируется при добавлении ингредиента в состав бургера (стр.77)
                key={item.id}
                onSwap={swapIngredients}
              />
            ))
          ) : (
            <div className={styles.item}>
              <div className={styles.empty_filling}>
                <p className="text text_type_main-default text_color_inactive">
                  Перетащите начинку
                </p>
              </div>
            </div>
          )}
        </div>
        {burger.bun ? (
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
        ) : (
          <div className={styles.item}>
            <div className={styles.empty_bun_bottom}>
              <p className="text text_type_main-default text_color_inactive">
                Перетащите булку
              </p>
            </div>
          </div>
        )}
      </div>
      {!burgerEmpty && (
        <div className={styles.footer}>
          {loading ? (
            <p className="text text_type_main-default text_color_inactive text-left">
              Ждите, идет обработка заказа...
            </p>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
      {isModalOpen && (
        <Modal
          onClose={() => {
            !loading && dispatch(orderClear());
            closeModal();
          }}
        >
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
