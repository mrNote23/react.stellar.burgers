import { FC, useMemo, useRef, useState } from "react";
import { TIngredient } from "../../types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "./ingredient/ingredient";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import styles from "./burger-ingredients.module.css";

const BUN = "bun";
const MAIN = "main";
const SAUCE = "sauce";

const BurgerIngredients: FC<{ data: TIngredient[] }> = ({ data }) => {
  const [currentTab, setCurrentTab] = useState(BUN);
  const [showModal, setShowModal] = useState(false);
  const currentIngredient = useRef<TIngredient | null>(null);

  const buns = useMemo(
    () => data.filter((elm: TIngredient) => elm.type === BUN),
    [data]
  );
  const sauces = useMemo(
    () => data.filter((elm: TIngredient) => elm.type === SAUCE),
    [data]
  );
  const mains = useMemo(() => data.filter((elm) => elm.type === MAIN), [data]);

  const showIngredientDetails = (ingredient: TIngredient) => {
    currentIngredient.current = ingredient;
    setShowModal(true);
  };

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
      <div className={`${styles.ingredients} mt-5`}>
        <p className="text text_type_main-medium mt-5 w-100">Булки</p>
        {buns.map((item: TIngredient) => (
          <Ingredient
            key={item._id}
            ingredient={item}
            onClick={() => showIngredientDetails(item)}
          />
        ))}

        <p className="text text_type_main-medium mt-10 w-100">Соусы</p>
        {sauces.map((item: TIngredient) => (
          <Ingredient
            key={item._id}
            ingredient={item}
            onClick={() => showIngredientDetails(item)}
          />
        ))}

        <p className="text text_type_main-medium mt-10 w-100">Начинки</p>
        {mains.map((item: TIngredient) => (
          <Ingredient
            key={item._id}
            ingredient={item}
            onClick={() => showIngredientDetails(item)}
          />
        ))}
      </div>
      <Modal
        visible={showModal}
        setVisible={setShowModal}
        title="Детали ингредиента"
      >
        {currentIngredient.current && (
          <IngredientDetails ingredient={currentIngredient.current} />
        )}
      </Modal>
    </section>
  );
};

export default BurgerIngredients;
