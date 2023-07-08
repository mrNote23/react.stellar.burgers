import { useEffect, useMemo, useRef, useState } from "react";
import { TIngredient } from "@config/types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsItem from "@components/burger-ingredients/burger-ingredients-item/burger-ingredients-item";
import { useSelector } from "react-redux";
import { TRootState } from "@store/store";

import styles from "./burger-ingredients.module.css";

const BUN_TYPE = "bun";
const MAIN_TYPE = "main";
const SAUCE_TYPE = "sauce";

const BUN = { type: BUN_TYPE, scroll: true };
const MAIN = { type: MAIN_TYPE, scroll: true };
const SAUCE = { type: SAUCE_TYPE, scroll: true };

type TBun = {
  type: string;
  scroll: boolean;
};

const BurgerIngredients = () => {
  const ingredients = useSelector(
    (store: TRootState) => store.ingredients.ingredients
  );

  const [currentTab, setCurrentTab] = useState<TBun>(BUN);

  const bunTarget = useRef<HTMLParagraphElement>(null);
  const mainTarget = useRef<HTMLParagraphElement>(null);
  const sauceTarget = useRef<HTMLParagraphElement>(null);

  const scrollWindow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentTab.scroll) {
      return;
    }
    switch (currentTab.type) {
      case BUN_TYPE:
        (bunTarget.current as HTMLParagraphElement).scrollIntoView({
          behavior: "smooth",
        });
        break;
      case MAIN_TYPE:
        (mainTarget.current as HTMLParagraphElement).scrollIntoView({
          behavior: "smooth",
        });
        break;
      case SAUCE_TYPE:
        (sauceTarget.current as HTMLParagraphElement).scrollIntoView({
          behavior: "smooth",
        });
        break;
      default:
        break;
    }
  }, [currentTab]);

  useEffect(() => {
    const targets = [
      bunTarget.current,
      mainTarget.current,
      sauceTarget.current,
    ];
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.every((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            switch (entry.target) {
              case bunTarget.current:
                setCurrentTab({ ...BUN, scroll: false });
                return false;
              case sauceTarget.current:
                setCurrentTab({ ...SAUCE, scroll: false });
                return false;
              case mainTarget.current:
                setCurrentTab({ ...MAIN, scroll: false });
                return false;
              default:
                break;
            }
          }
          return true;
        });
      },
      {
        root: scrollWindow.current,
        rootMargin: "0px 0px -90% 0px",
      }
    );

    targets.forEach((target) =>
      observer.observe(target as HTMLParagraphElement)
    );
  }, []);

  const buns = useMemo(
    () => ingredients.filter((elm: TIngredient) => elm.type === BUN_TYPE),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((elm: TIngredient) => elm.type === SAUCE_TYPE),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((elm: TIngredient) => elm.type === MAIN_TYPE),
    [ingredients]
  );

  return (
    <section className={styles.section}>
      <p className="text text_type_main-large mt-10 pb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <Tab
          value={BUN_TYPE}
          active={currentTab.type === BUN_TYPE}
          onClick={() => {
            setCurrentTab(BUN);
          }}
        >
          Булки
        </Tab>
        <Tab
          value={SAUCE_TYPE}
          active={currentTab.type === SAUCE_TYPE}
          onClick={() => {
            setCurrentTab(SAUCE);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value={MAIN_TYPE}
          active={currentTab.type === MAIN_TYPE}
          onClick={() => {
            setCurrentTab(MAIN);
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients} mt-5`} ref={scrollWindow}>
        <p className="text text_type_main-medium mt-5 w-100" ref={bunTarget}>
          Булки
        </p>
        {buns.map((item: TIngredient) => (
          <BurgerIngredientsItem key={item._id} ingredient={item} />
        ))}

        <p className="text text_type_main-medium mt-10 w-100" ref={sauceTarget}>
          Соусы
        </p>
        {sauces.map((item: TIngredient) => (
          <BurgerIngredientsItem key={item._id} ingredient={item} />
        ))}

        <p className="text text_type_main-medium mt-10 w-100" ref={mainTarget}>
          Начинки
        </p>
        {mains.map((item: TIngredient) => (
          <BurgerIngredientsItem key={item._id} ingredient={item} />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
