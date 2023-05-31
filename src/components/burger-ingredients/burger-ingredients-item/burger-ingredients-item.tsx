import { FC } from "react"
import { Link } from "react-router-dom"
import { useDrag } from "react-dnd"
import { TIngredient } from "../../../types"
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./burger-ingredients-item.module.css"

type TBurgerIngredientsItemProps = {
  ingredient: TIngredient
  onClick: () => void
}

const BurgerIngredientsItem: FC<TBurgerIngredientsItemProps> = ({ ingredient, onClick }) => {
  const [, dragIngredient] = useDrag({
    type: "ingredient",
    item: {
      ingredient
    }
  })

  return (
    <div className={styles.item} onClick={onClick} ref={dragIngredient}>
      <Link to='/'>
        <Counter count={1} size='default' extraClass='m-5' />
        <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4' />
        <div className={styles.price}>
          <span className='text text_type_digits-default pr-2'>{ingredient.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <p className='text text_type_main-small text-center'>{ingredient.name}</p>
      </Link>
    </div>
  )
}

export default BurgerIngredientsItem
