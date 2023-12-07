import React from "react";
import { Button } from "@/components/common";
import styles from "./ReviewForm.module.css";

const ReviewForm = () => {
  const handleReviewForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className={styles["review-form"]} onSubmit={handleReviewForm}>
      <textarea className={styles["review-form__textarea"]} autoFocus />
      <Button type="submit">
        <h3>방명록 등록하기</h3>
      </Button>
    </form>
  );
};

export default ReviewForm;
