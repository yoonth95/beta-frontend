import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, DeleteButton } from "@/components/common";
import { useModalStore } from "@/stores/useModalStore";
import CommentIcon from "@/assets/comment.svg?react";
import classNames from "classnames/bind";
import styles from "./PostManage.module.css";
import LikeIcon from "@/assets/like.svg?react";

const cx = classNames.bind(styles);

const item = {
  title: "서울대학교 산업디자인학과 23년 졸전 놀러오세요",
  date: "2023.12.04 ~ 2023.12.08",
  likeCount: 46,
  reviewCount: 2,
  id: 4,
};
const PostManage = () => {
  const navigate = useNavigate();
  const { openModal, setOpenModal } = useModalStore();

  return (
    <>
      <div className={styles["container"]}>
        <ul className={styles["list"]}>
          {Array(5)
            .fill(item)
            .map((item) => (
              <li className={cx("list-row", "list-item")}>
                <Link to={"/detail/3"} className={styles["list-row-left"]}>
                  <h3 className={cx("list-item__title", "ellipsis-multi")}>{item.title}</h3>
                  <p className={styles["list-item__date"]}>{item.date}</p>
                </Link>
                <div className={styles["list-row-right"]}>
                  <div className={styles["like-cnt"]}>
                    <LikeIcon />
                    <span>{item.likeCount}</span>
                  </div>
                  <Button
                    reverseColor={true}
                    onClick={() => {
                      setOpenModal({ state: true, type: "" });
                    }}
                    style={{ padding: "0.6rem" }}
                  >
                    <CommentIcon className={styles["cmt-icon"]} />
                    <span>{item.reviewCount}</span>
                  </Button>
                  <Button reverseColor={true} style={{ padding: "0.6rem" }}>
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
          <strong className={styles["review-count"]}>총 후기수: 2명</strong>
          <ul className={styles["review-list"]}>
            {Array(5)
              .fill(0)
              .map(() => (
                <li className={styles["review"]}>
                  <div className={styles["review-contents"]}>
                    <strong className={styles["review__nickname"]}>윤태현</strong>
                    <p className={styles["review__content"]}>
                      너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무
                      좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무 좋았습니다.너무
                      좋았습니다.너무 좋았습니다.너무 좋았습니다.
                    </p>
                    <span className={styles["review__date"]}>2023-12-08</span>
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
