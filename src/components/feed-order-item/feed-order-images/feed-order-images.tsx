import { TOriginalIngredient } from "@config/types";
import { FC, useMemo } from "react";
import styles from "./feed-order-images.module.css";

export const FeedOrderImages: FC<{ ingredients: TOriginalIngredient[] }> = ({
  ingredients,
}) => {
  const showMore = useMemo(() => ingredients.length - 6, [ingredients]);

  return (
    <div className={styles.container}>
      {ingredients.slice(0, 6).map((item, index) => (
        <div
          key={item._id}
          className={styles.item}
          style={{ zIndex: 6 - index }}
        >
          <div className={styles.image}>
            <img
              key={item._id}
              src={item.image_mobile}
              alt={item.name}
              style={{
                opacity: index === 5 && showMore > 0 ? "0.3" : "1",
              }}
            />
            {index === 5 && showMore > 0 && (
              <span className={`text text_type_main-default ${styles.more}`}>
                +{showMore}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
