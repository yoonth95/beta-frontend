import { useQuery } from "@tanstack/react-query";
import ReviewMypageItem from "../ReviewMypageItem/ReviewMypageItem";
import { getUserReviewList } from "@/apis";
import nullImage from "@/assets/null-page.png";
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
      {userReviewList.length > 0 ? (
        userReviewList.map((item) => <ReviewMypageItem key={item.id} {...item} />)
      ) : (
        <div className={styles["review-null"]}>
          <img src={nullImage} alt="빈 화면" />
          <p>
            아직 후기가 없어요! <br />
            응원의 한마디를 남겨주시면 어떨까요?
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewManage;
