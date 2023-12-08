import React, { useMemo } from "react";
import { useColor } from "color-thief-react";
import getTxtColorByBgColor from "@/utils/getTxtColorByBgColor";
import styles from "./TicketCard.module.css";

interface PropsType {
  item: { title: string; location: string; date: string; imgSrc: string; id: string };
}

const TicketCard: React.FC<PropsType> = ({ item }) => {
  const { data: backgroundColor } = useColor(item.imgSrc, "hex");
  const color = useMemo(() => getTxtColorByBgColor(backgroundColor), [backgroundColor]);

  return (
    <article className={styles.card} style={{ backgroundColor }}>
      <div className={styles["card__img-wrapper"]}>
        <img src={item.imgSrc} alt="" />
      </div>

      <div className={styles["card__info"]} style={{ color }}>
        <h3 className={"ellipsis-multi"}>{item.title}</h3>
        <p className={"ellipsis-multi"}>{item.date}</p>
        <p className={"ellipsis-multi"}>{item.location}</p>
      </div>
    </article>
  );
};

export default TicketCard;
