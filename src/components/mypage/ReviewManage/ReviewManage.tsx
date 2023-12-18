import React from "react";
import ReviewMypageItem from "../ReviewMypageItem/ReviewMypageItem";
import styles from "./ReviewManage.module.css";

const dummy = [
  {
    id: 1,
    login_id: "yoonth0919",
    title: "전시 제목",
    comment: "너무 잘하셨어요",
    date: "2023-12-19",
  },
  {
    id: 1,
    login_id: "yoonth0919",
    title: "전시 제목",
    comment: "너무 좋았습니다",
    date: "2023-12-06",
  },
  {
    id: 3,
    login_id: "yoonth0919",
    title: "전시 제목",
    comment: "신선했어요",
    date: "2023-12-05",
  },
];

const ReviewManage = () => {
  return (
    <div className={styles["RevieManage-container"]}>
      {dummy.map((item) => (
        <ReviewMypageItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ReviewManage;
