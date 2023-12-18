import React from "react";
import styles from "./ReviewMypageItem.module.css";

interface ReviewMypageItemProps {
  login_id: string;
  title: string;
  comment: string;
  date: string;
}

const ReviewMypageItem: React.FC<ReviewMypageItemProps> = (item) => {
  return (
    <div className={styles["ReviewItem-container"]}>
      <div className={styles["ReviewItem-box"]}>
        <div className={styles["ReviewItem-section-top"]}>
          <strong>{item.login_id}</strong>
          <span className="ellipsis">{item.title}</span>
        </div>
        <div className={styles["ReviewItem-section-bottom"]}>
          <span className="ellipsis">{item.comment}</span>
          <strong>{item.date}</strong>
          <div className={styles["newCircle"]}>N</div>
        </div>
      </div>
      <div className={styles["delete__button"]}></div>
    </div>
  );
};

export default ReviewMypageItem;
