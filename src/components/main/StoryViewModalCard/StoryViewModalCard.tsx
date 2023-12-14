import React, { useMemo } from "react";
import Color from "color-thief-react";
import { StoryType } from "@/types";
import getTxtColorByBgColor from "@/utils/getTxtColorByBgColor";
import styles from "./StoryViewModalCard.module.css";

interface PropsType {
  item: StoryType;
}
const StoryViewModalCard: React.FC<PropsType> = ({ item }) => {
  const imgSrc = `${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.story_image_url}`;
  const tags = useMemo<string[]>(() => Object.values(JSON.parse(item.tags)), [item.tags]);

  return (
    <Color src={imgSrc} crossOrigin={"Anonymous"} format="hex">
      {({ data: backgroundColor }) => (
        <article className={styles.card} style={{ backgroundColor, color: getTxtColorByBgColor(backgroundColor) }}>
          <strong className={styles["card__nickname"]}>@{item.user_id}</strong>
          <div className={styles["card__img-wrapper"]}>
            <img className={styles["card__img"]} src={imgSrc} />
          </div>
          <div className={styles["card__tags"]}>
            {tags.map((tag, index) => (
              <span key={index}>#{tag} </span>
            ))}
          </div>
        </article>
      )}
    </Color>
  );
};

export default StoryViewModalCard;
