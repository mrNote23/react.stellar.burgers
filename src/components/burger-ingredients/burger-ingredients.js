import { Fragment, useEffect, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import Ingredient from "./ingredient/ingredient";

const ingredientsTypes = {
  bun: "Булки",
  sauce: "Соусы",
  main: "Начинки",
};

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState("bun");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
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
  }, []);

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
      <div className={styles.ingredients}>
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
