import { FC } from "react"
import { TIngredient } from "../../types"
import styles from "./ingredient-details.module.css"

type TIngredientDetailsProps = {
  ingredient: TIngredient
}
const IngredientDetails: FC<TIngredientDetailsProps> = ({ ingredient }) => {
  return (
    <>
      <div className='pl-25 pr-25 text-center'>
        <img src={ingredient.image_large} alt={ingredient.name} className={styles.detailImg} />
        <p className='text text_type_main-medium mt-4'>{ingredient.name}</p>
        <ul className={`${styles.details} mt-8 mb-15`}>
          <li className={styles.detail}>
            <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
          </li>
          <li className={styles.detail}>
            <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
          </li>
          <li className={styles.detail}>
            <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
          </li>
          <li className={styles.detail}>
            <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </>
  )
}

export default IngredientDetails
