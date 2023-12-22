import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, DeleteButton } from "@/components/common";
import { useModalStore } from "@/stores/useModalStore";
import CommentIcon from "@/assets/comment.svg?react";
import classNames from "classnames/bind";
import styles from "./PostManage.module.css";
import LikeIcon from "@/assets/like.svg?react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteReview, getMyShowList, getReviews } from "@/apis";
import { ReviewDeleteParamType, ReviewType } from "@/types";
import getElapsedTime from "@/utils/getElapsedTime";

const cx = classNames.bind(styles);

const PostManage = () => {
  const navigate = useNavigate();
  const { openModal, setOpenModal } = useModalStore();
  const [showId, setShowId] = useState<string>("");

  // 게시글 리스트를 가져오는 쿼리
  const {
    status: statusShowList,
    data: showList,
    error: errorShowList,
  } = useQuery({
    queryKey: ["showList"],
    queryFn: () => getMyShowList(),
  });

  // 후기 리스트를 가져오는 쿼리 (조건부로 호출)
  const {
    status: statusReviewList,
    data: reviewList,
    error: errorReviewList,
    refetch: refetchReviews,
  } = useQuery({
    queryKey: ["reviewList", showId],
    queryFn: () => getReviews(showId),
    enabled: !!showId,
  });

  // 후기 삭제를 위한 뮤테이션
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (review: ReviewDeleteParamType) => deleteReview(review),
    onSuccess: () => refetchReviews(),
  });

  if (statusShowList === "pending") return <h1>loading...</h1>;
  if (statusShowList === "error") return <h1>{errorShowList.message}</h1>;

  const handleClickReviewsCnt = async (title: string, showId: string) => {
    setOpenModal({ state: true, type: title });
    setShowId(() => showId);
  };

  const handleClickDelete = (item: ReviewType) => () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const { id: review_id, show_id } = item;
      deleteMutate({ review_id, show_id });
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <ul className={styles["list"]}>
          {showList.map((item) => (
            <li className={cx("list-row", "list-item")} key={item.id}>
              <Link to={`/detail/${item.id}`} className={styles["list-row-left"]}>
                <h3 className={cx("list-item__title", "ellipsis-multi")}>{item.title}</h3>
                <p className={styles["list-item__date"]}>{item.start_date + " ~ " + item.end_date}</p>
              </Link>
              <div className={styles["list-row-right"]}>
                <div className={styles["like-cnt"]}>
                  <LikeIcon />
                  <span>
                    {item.likes_count}
                    <span className="a11y-hidden">개의 좋아요</span>
                  </span>
                </div>
                <Button reverseColor={true} onClick={() => handleClickReviewsCnt(item.title, item.id.toString())} style={{ padding: "0.6rem" }}>
                  <CommentIcon className={styles["cmt-icon"]} />
                  <span>
                    {item.reviews_count}
                    <span className="a11y-hidden">개의 댓글</span>
                  </span>
                </Button>
                <Button reverseColor={true} style={{ padding: "0.6rem" }} onClick={() => navigate("./update", { state: item.id })}>
                  수정/삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Button style={{ fontSize: "0.75rem", width: "fit-content", marginLeft: "auto" }} onClick={() => navigate("./upload")}>
        게시글 업로드
      </Button>

      {openModal.state && (
        <Modal title={openModal.type}>
          {statusReviewList === "error" && <h1>{errorReviewList.message}</h1>}
          {statusReviewList !== "success" ? (
            <h1>loading...</h1>
          ) : (
            <>
              <strong className={styles["review-count"]}>총 후기수: {reviewList.length}명</strong>
              {reviewList.length ? (
                <ul className={styles["review-list"]}>
                  {reviewList.map((item) => (
                    <li className={styles["review"]}>
                      <div className={styles["review-contents"]}>
                        <strong className={styles["review__nickname"]}>{item.login_id.slice(0, 3) + "***"}</strong>
                        <p className={styles["review__content"]}>{item.comment}</p>
                        <span className={styles["review__date"]}>{getElapsedTime(item.created_at)}</span>
                      </div>
                      <DeleteButton spanHidden="해당 댓글 삭제" onClick={handleClickDelete(item)} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>댓글이 없습니다</p>
              )}
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default PostManage;
