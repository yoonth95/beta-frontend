import React from "react";
import styles from "./Story.module.css";

interface PropsType {
  title: string;
  imgSrc: string;
}

const Story: React.FC<PropsType> = ({ title, imgSrc }) => {
  return (
    <article className={styles.card}>
      <h3 className={"a11y-hidden"}>{title}</h3>
      <div className={styles["card__img-wrapper"]}>
        <img className={styles["card__img"]} src={imgSrc} alt={title} />
      </div>
    </article>
  );
};

export default Story;
