import { Carousel } from "@/components/common";
import styles from "./StoryViewModal.module.css";
import Color from "color-thief-react";

const items = [
  { imgSrc: "/public/card-image.png", tags: "#멋지다신은수, #졸업축하해" },
  { imgSrc: "/public/story-img.jpg", tags: "#멋지다신은수, #졸업축하해#멋지다신은수" },
];

const StoryViewModal = () => {
  return (
    <div className={styles["modal"]}>
      <Carousel index={2}>
        {items.map(({ imgSrc, tags }) => {
          return (
            <Color src={imgSrc} format="hex">
              {({ data: backgroundColor }) => (
                <article className={styles.card} style={{ backgroundColor }}>
                  <strong className={styles["card__nickname"]}>@유저닉네임</strong>
                  <div className={styles["card__img-wrapper"]}>
                    <img className={styles["card__img"]} src={imgSrc} />
                  </div>
                  <div className={styles["card__tags"]}>{tags}</div>
                </article>
              )}
            </Color>
          );
        })}
      </Carousel>
    </div>
  );
};

export default StoryViewModal;
