import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, DeleteButton } from "@/components/common";
import { useModalStore } from "@/stores/useModalStore";
import CommentIcon from "@/assets/comment.svg?react";
import classNames from "classnames/bind";
import styles from "./PostManage.module.css";
import LikeIcon from "@/assets/like.svg?react";
import { useQuery } from "@tanstack/react-query";
import { getMyShowList, getReviews } from "@/apis";
import { ReviewType } from "@/types";
import getElapsedTime from "@/utils/getElapsedTime";

const cx = classNames.bind(styles);

const PostManage = () => {
  const navigate = useNavigate();
  const { openModal, setOpenModal } = useModalStore();
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);

  const {
    status,
    data: showList,
    error,
  } = useQuery({
    queryKey: ["showList"],
    queryFn: () => getMyShowList(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  const handleClickReviewsCnt = async (showId: string) => {
    setOpenModal({ state: true, type: "" });
    try {
      const data = await getReviews(showId);
      setReviewData(data);
    } catch (e) {
      // 에러 페이지 처리
      console.error(e);
    }
  };

  return (
    <>
      <div className={styles["container"]}>
        <ul className={styles["list"]}>
          {showList.map((item) => (
            <li className={cx("list-row", "list-item")}>
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
                <Button reverseColor={true} onClick={() => handleClickReviewsCnt(item.id.toString())} style={{ padding: "0.6rem" }}>
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
        <Modal title="서울대 어쩌고">
          <strong className={styles["review-count"]}>총 후기수: {reviewData.length}명</strong>
          <ul className={styles["review-list"]}>
            {reviewData.map((item) => (
              <li className={styles["review"]}>
                <div className={styles["review-contents"]}>
                  <strong className={styles["review__nickname"]}>{item.login_id.slice(0, 3) + "***"}</strong>
                  <p className={styles["review__content"]}>{item.comment}</p>
                  <span className={styles["review__date"]}>{getElapsedTime(item.created_at)}</span>
                </div>
                <DeleteButton spanHidden="해당 댓글 삭제" onClick={() => console.log("댓글 삭제")} />
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
};

export default PostManage;
