import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useColor } from "color-thief-react";
import getTxtColorByBgColor from "@/utils/getTxtColorByBgColor";
import { ShowType } from "@/types";
import styles from "./TicketCard.module.css";

interface PropsType {
  item: ShowType;
}

const TicketCard: React.FC<PropsType> = ({ item }) => {
  const { data: backgroundColor } = useColor(`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.main_image_url}`, "hex", { crossOrigin: "anonymous" });
  const color = useMemo(() => getTxtColorByBgColor(backgroundColor), [backgroundColor]);

  return (
    <article className={styles.card} style={{ backgroundColor }}>
      <Link to={`detail/${item.id}`}>
        <div className={styles["card__img-wrapper"]}>
          <img src={`${import.meta.env.VITE_APP_IMAGE_DOMAIN}${item.main_image_url}`} alt="" />
        </div>

        <div className={styles["card__info"]} style={{ color }}>
          <h3 className={"ellipsis-multi"}>{item.title}</h3>
          <p className={"ellipsis-multi"}>
            {item.start_date} ~ {item.end_date}
          </p>
          <p className={"ellipsis-multi"}>{item.location}</p>
        </div>
      </Link>
    </article>
  );
};

export default TicketCard;
