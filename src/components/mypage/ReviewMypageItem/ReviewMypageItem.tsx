import React from "react";
import { DeleteButton } from "@/components/common";
import getElapsedTime from "@/utils/getElapsedTime";
import isInDay from "@/utils/isInDay";
import styles from "./ReviewMypageItem.module.css";

interface ReviewMypageItemProps {
  login_id: string;
  title: string;
  comment: string;
  date: string;
}

const ReviewMypageItem: React.FC<ReviewMypageItemProps> = (item) => {
  const handleClickDeleteButton = () => {
    console.log("삭제");
  };

  const elapsedTime = getElapsedTime(item.date);
  const isNew = isInDay(item.date);
  console.log(isNew);
  return (
    <div className={styles["ReviewItem-container"]}>
      <div className={styles["ReviewItem-box"]}>
        <div className={styles["ReviewItem-section-top"]}>
          <strong>{item.login_id}</strong>
          <span className="ellipsis">{item.title}</span>
        </div>
        <div className={styles["ReviewItem-section-bottom"]}>
          <span className="ellipsis">{item.comment}</span>
          <strong>{elapsedTime}</strong>
          {isNew && <div className={styles["newCircle"]}>N</div>}
        </div>
      </div>
      <DeleteButton onClick={handleClickDeleteButton} spanHidden="삭제" />
    </div>
  );
};

export default ReviewMypageItem;
