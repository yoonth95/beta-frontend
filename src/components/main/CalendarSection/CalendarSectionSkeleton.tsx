import Skeleton from "react-loading-skeleton";
import styles from "@/components/common/BasicCard/BasicCard.module.css";

const CalendarSectionSkeleton = () => {
  return Array(4)
    .fill(0)
    .map((_, index) => (
      <article key={index} className={styles.card}>
        <div style={{ height: "17.5rem", marginBottom: "1rem" }}>
          <Skeleton className={styles["card__img"]} />
        </div>
        <Skeleton width={"50%"} height={"1.3rem"} style={{ marginBottom: "0.25rem" }} />
        <Skeleton width={"80%"} style={{ marginBottom: "0.25rem" }} />
        <Skeleton />
      </article>
    ));
};

export default CalendarSectionSkeleton;
