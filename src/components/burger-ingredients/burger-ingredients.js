import { Fragment, useEffect, useRef, useState } from "react";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";

const ingredientsTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const [ingredients, setIngredients] = useState([]);
  const listWindow = useRef();

  useEffect(() => {
    // onResize();
    // window.addEventListener("resize", onResize);

    const tmp = [];
    data.forEach((elm) => {
      tmp[elm.type] = tmp[elm.type] ? tmp[elm.type] : [];
      tmp[elm.type].push(elm);
    });
    const tmp2 = [];
    Object.entries(tmp).forEach(([key, value]) => {
      tmp2.push({
        type: ingredientsTypes[key],
        items: value,
      });
    });

    setIngredients(tmp2);

    // return () => {
    //   window.removeEventListener("resize", onResize);
    // };
  }, []);

  const onResize = () => {
    listWindow.current.style.height = `${
      window.innerHeight - 82 - 60 - 56 - 120
    }px`;
  };

  const Ingredient = (props) => {
    return (
      <div className={styles.item}>
        <Counter count={1} size="default" extraClass="m-5" />
        <img src={props.image} alt={props.name} className="ml-4 mr-4" />
        <div className={styles.price}>
          <span className="text text_type_digits-default pr-2">
            {props.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-small text-center">{props.name}</p>
      </div>
    );
  };

  return (
    <section className={styles.section}>
      <p className="text text_type_main-large mt-10 pb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={() => {
            setCurrentTab("bun");
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={() => {
            setCurrentTab("sauce");
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={() => {
            setCurrentTab("main");
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients} ref={listWindow}>
        {ingredients.map((type, index) => (
          <Fragment key={index}>
            <p className="text text_type_main-medium mt-10 w-100">
              {type.type}
            </p>
            {type.items.map((item) => (
              <Ingredient key={item._id} {...item} />
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
