import React from "react";
import { Link } from "react-router-dom";
import { ShowType } from "@/types";
import styles from "./BasicCard.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface PropsType {
  item: ShowType;
}
const BasicCard: React.FC<PropsType> = ({ item }) => {
  return (
    <article className={styles.card}>
      <Link to={`/detail/${item.id}`}>
        <div className={styles["card__img-wrapper"]}>
          <img className={styles["card__img"]} src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.main_image_url}`} />
        </div>
        <h3 className={cx("card__title", "ellipsis")}>{item.title}</h3>
        <p className={cx("card__location", "ellipsis")}>{item.location}</p>
        <p className={styles["card__date"]}>
          {item.start_date} ~ {item.end_date}
        </p>
      </Link>
    </article>
  );
};

export default BasicCard;
