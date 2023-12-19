import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "@/components/common";
import { ReviewItem, ReviewForm, GuestAccess } from "@/components/detail";
import { useModalStore } from "@/stores/useModalStore";
import { useLoginStore } from "@/stores/useLoginStore";
import { getReviews } from "@/apis";
import styles from "./ReviewSection.module.css";
import { useState } from "react";

const ReviewSection = () => {
  const { id: show_id } = useParams();
  const [clickedReviewId, setClickedReviewId] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const {
    userState: { login_id: isLogin },
  } = useLoginStore();
  const { openModal, setOpenModal } = useModalStore();

  const {
    data: reviewData,
    status,
    error,
  } = useQuery({
    queryKey: ["reviewData", show_id],
    queryFn: () => (show_id ? getReviews(show_id) : []),
    select: (item) => ({ reviews: item.slice(0, page * 5), totalCounts: item.length }),
  });

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <>
      <section className={styles["review-upload-section"]}>
        {isLogin ? (
          <ReviewForm />
        ) : (
          <>
            <Button onClick={() => setOpenModal({ state: true, type: "guestAccess" })}>
              <h3>방명록 작성하기</h3>
            </Button>
            {openModal.state && openModal.type === "guestAccess" && (
              <Modal title="회원가입/로그인으로 이동" titleHidden width="600px" height="500px">
                <GuestAccess />
              </Modal>
            )}
          </>
        )}
      </section>

      <section className={styles["review-list-section"]}>
        <h3 className={styles["review-list-section__title"]}>{reviewData.totalCounts}명 참여</h3>
        <ul>
          {reviewData.reviews.map((reviewItem) => (
            <li key={reviewItem.id}>
              <ReviewItem item={reviewItem} clickedReviewId={clickedReviewId} setClickedReviewId={setClickedReviewId} />
            </li>
          ))}
        </ul>
        {page * 5 < reviewData.totalCounts && (
          <Button
            reverseColor
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            더보기
          </Button>
        )}
      </section>
    </>
  );
};

export default ReviewSection;
