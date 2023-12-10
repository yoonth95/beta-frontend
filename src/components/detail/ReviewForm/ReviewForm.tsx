import React from "react";
import { Button } from "@/components/common";
import styles from "./ReviewForm.module.css";

const ReviewForm = () => {
  const handleReviewForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className={styles["review-form"]} onSubmit={handleReviewForm}>
      <textarea
        className={styles["review-form__textarea"]}
        autoFocus
        placeholder="방문한 곳은 어떠셨나요? 후기/방명록을 통해 회원님의 멋진 경험을 공유해보세요!"
      />
      <Button type="submit">
        <h3>방명록 등록하기</h3>
      </Button>
    </form>
  );
};

export default ReviewForm;
