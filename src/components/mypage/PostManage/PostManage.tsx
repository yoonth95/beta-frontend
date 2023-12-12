import { Link } from "react-router-dom";
import { Button, Modal } from "@/components/common";
import { useModalStore } from "@/stores/useModalStore";
import CommentIcon from "@/assets/comment.svg?react";
import DeleteIcon from "@/assets/plus.svg?react";
import classNames from "classnames/bind";
import styles from "./PostManage.module.css";

const cx = classNames.bind(styles);

const item = {
  title: "서울대학교 산업디자인학과 23년 졸전 놀러오세요",
  date: "2023.12.04 ~ 2023.12.08",
  likeCount: 46,
  reviewCount: 2,
  id: 4,
};
const PostManage = () => {
  const { openModal, setOpenModal } = useModalStore();

  return (
    <>
      <h2 className="a11y-hidden">게시글 리스트</h2>
      <div className={styles["container"]}>
        <div className={cx("list-row", "list-header")}>
          <strong>제목</strong>
          <strong>좋아요</strong>
          <strong>후기</strong>
        </div>
        <ul className={styles["list"]}>
          {Array(5)
            .fill(item)
            .map((item) => (
              <li className={cx("list-row", "list-item")}>
                <Link to={"/detail/3"}>
                  <h3 className={cx("list-item__title", "ellipsis-multi")}>{item.title}</h3>
                  <p className={styles["list-item__date"]}>{item.date}</p>
                </Link>
                <span>{item.likeCount}</span>
                <Button
                  reverseColor={true}
                  onClick={() => {
                    setOpenModal({ state: true, type: "" });
                  }}
                >
                  <CommentIcon />
                  <span>{item.reviewCount}</span>
                </Button>
                <Button reverseColor={true}>수정/삭제</Button>
              </li>
            ))}
        </ul>
      </div>
      <Button>게시글 업로드</Button>

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

                  <button type="button" className={styles["delete-btn"]}>
                    <DeleteIcon />
                    <span className={"a11y-hidden"}>해당 댓글 삭제</span>
                  </button>
                </li>
              ))}
          </ul>
        </Modal>
      )}
    </>
  );
};

export default PostManage;
