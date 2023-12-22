import React from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewMypageItem from "../ReviewMypageItem/ReviewMypageItem";
import { getUserReviewList } from "@/apis";
import styles from "./ReviewManage.module.css";

const ReviewManage = () => {
  const {
    status,
    error,
    data: userReviewList,
  } = useQuery({
    queryKey: ["userReviewList"],
    queryFn: () => getUserReviewList(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return (
    <div className={styles["review-container"]}>
      {userReviewList.map((item) => (
        <ReviewMypageItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ReviewManage;
