import React from "react";
import IconEllipsisVertical from "@/assets/icon-ellipsis-vertical.png";
import styles from "./ReviewItem.module.css";
import getElapsedTime from "@/utils/getElapsedTime";
import EllipsisProfileImg from "@/assets/ellipsis-profile.svg?react";

interface ReviewItemType {
  item: ReviewType;
}

interface ReviewType {
  id: number;
  username: string;
  createdAt: string;
  text: string | null;
}

const ReviewItem: React.FC<ReviewItemType> = ({ item }) => {
  return (
    <div className={styles["review"]}>
      <div className={styles["review-content-top"]}>
        <div className={styles["review__userinfo"]}>
          <div className={styles["profile-img-cover"]}>
            <EllipsisProfileImg />
          </div>
          <strong className={styles["username"]}>{item.username}</strong>
        </div>
        <span className={styles["review__created-at"]}>{getElapsedTime(item.createdAt)}</span>
      </div>
      <h4 className={styles["review__text"]}>{item.text}</h4>

      {/* 본인 댓글에만 더보기 버튼 */}
      {/* active로 제어 */}
      <button type="button" className={styles["review__ellipsis"]}>
        <img src={IconEllipsisVertical} />
      </button>

      <div className={styles["review__button-list"]}>
        <button type="button">수정</button>
        <button type="button">삭제</button>
      </div>
    </div>
  );
};

export default ReviewItem;
