import React from "react";
import styles from "./ExhibitionListSection.module.css";
import { BasicCard } from "@/components/common";

const item = {
  id: "1",
  imgSrc: "/public/card-image.png",
  title: "서울대 전시회에 놀러오세요",
  location: "고려대학교 박물관 지하 1층 (백주년기념 삼성관) 기획 전시실 Ⅱ",
  date: "2023.11.23 - 2023.11.29",
};

const ExhibitionListSection = () => {
  return (
    <section className={styles["section"]}>
      <h2 className="a11y-hidden">전시 리스트</h2>
      <ul className={styles["exhibition-list"]}>
        {Array(9)
          .fill(0)
          .map(() => (
            <li>
              <BasicCard item={item} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ExhibitionListSection;
