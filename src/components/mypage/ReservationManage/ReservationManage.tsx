import { Button, Modal } from "@/components/common";
import { ReservationListModal } from "@/components/mypage";
import { useModalStore } from "@/stores/useModalStore";
import classNames from "classnames/bind";
import styles from "./ReservationManage.module.css";

const cx = classNames.bind(styles);

const item = {
  title: "서울대학교 산업디자인학과 23년 졸전 놀러오세요",
  date: "2023.12.04 ~ 2023.12.08",
  likeCount: 46,
  reviewCount: 2,
  id: 4,
};

const ReservationManage = () => {
  const { openModal, setOpenModal } = useModalStore();

  return (
    <>
      <h2 className="a11y-hidden">예매 관리 페이지</h2>
      <div className={styles["container"]}>
        <div className={cx("list-row", "list-header")}>
          <strong>제목</strong>
          <strong>기간</strong>
        </div>
        <ul className={styles["list"]}>
          {Array(10)
            .fill(item)
            .map((item, index) => (
              <li key={index} className={cx("list-row", "list-item")}>
                <h3 className={cx("list-item__title", "ellipsis-multi")}>{item.title}</h3>
                <p className={styles["list-item__date"]}>{item.date}</p>
                <Button
                  reverseColor={true}
                  onClick={() => {
                    setOpenModal({ state: true, type: "" });
                  }}
                >
                  예매 현황
                </Button>
              </li>
            ))}
        </ul>
      </div>

      {openModal.state && (
        <Modal title="서울대학교 산업디자인학과 23년 졸전">
          <ReservationListModal />
        </Modal>
      )}
    </>
  );
};

export default ReservationManage;
