import { useQuery } from "@tanstack/react-query";
import { getUserReviewList } from "@/apis";
import { ReviewItem } from "@/components/mypage";
import { NullField } from "@/components/common";
import styles from "./ReviewManagePage.module.css";

const ReviewManagePage = () => {
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
      {userReviewList.length > 0 ? (
        userReviewList.map((item) => <ReviewItem key={item.id} {...item} />)
      ) : (
        <NullField text1="아직 후기가 없어요!" text2="응원의 한마디를 남겨주시면 어떨까요?" />
      )}
    </div>
  );
};

export default ReviewManagePage;
