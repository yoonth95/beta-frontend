import React, { useMemo } from "react";
import { StoryType } from "@/types";
import styles from "./StoryViewModalCard.module.css";

interface PropsType {
  item: StoryType;
}
const StoryViewModalCard: React.FC<PropsType> = ({ item }) => {
  const imgSrc = `${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.story_image_url}`;

  const tags = useMemo<string[]>(() => Object.values(JSON.parse(item.tags)), [item.tags]);

  return (
    <article className={styles.card} style={{ backgroundColor: item.story_color || "" }}>
      <>
        <strong className={styles["card__nickname"]}>@{item.login_id}</strong>
        <div className={styles["card__img-wrapper"]}>
          <img className={styles["card__img"]} src={imgSrc} />
        </div>
        <div className={styles["card__tags"]}>
          {tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </div>
      </>
    </article>
  );
};

export default StoryViewModalCard;
