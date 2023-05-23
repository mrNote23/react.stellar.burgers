import { useMemo, useState } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient/ingredient";

const BUN = "bun";
const MAIN = "main";
const SAUCE = "sauce";

const BurgerIngredients = ({ data }) => {
  const [currentTab, setCurrentTab] = useState(BUN);

  const buns = useMemo(() => data.filter((elm) => elm.type === BUN), [data]);
  const sauces = useMemo(
    () => data.filter((elm) => elm.type === SAUCE),
    [data]
  );
  const mains = useMemo(() => data.filter((elm) => elm.type === MAIN), [data]);

  return (
    <section className={styles.section}>
      <p className="text text_type_main-large mt-10 pb-5">Соберите бургер</p>
      <div className={styles.tabs}>
        <Tab
          value={BUN}
          active={currentTab === BUN}
          onClick={() => {
            setCurrentTab(BUN);
          }}
        >
          Булки
        </Tab>
        <Tab
          value={SAUCE}
          active={currentTab === SAUCE}
          onClick={() => {
            setCurrentTab(SAUCE);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value={MAIN}
          active={currentTab === MAIN}
          onClick={() => {
            setCurrentTab(MAIN);
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredients}>
        <p className="text text_type_main-medium mt-10 w-100">Булки</p>
        {buns.map((item) => (
          <Ingredient key={item._id} {...item} />
        ))}

        <p className="text text_type_main-medium mt-10 w-100">Соусы</p>
        {sauces.map((item) => (
          <Ingredient key={item._id} {...item} />
        ))}

        <p className="text text_type_main-medium mt-10 w-100">Начинки</p>
        {mains.map((item) => (
          <Ingredient key={item._id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
