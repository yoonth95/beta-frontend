import { Button, SelectBox } from "@/components/common";
import classNames from "classnames/bind";
import styles from "./ReservationListModal.module.css";

const cx = classNames.bind(styles);

const item = {
  user: "신은수",
  email: "ses2201@naver.com",
  date: "2023-12-04 12시",
  likeCount: 46,
  reviewCount: 2,
  id: 4,
};

const ReservationListModal = () => {
  return (
    <>
      <div className={styles["top-section"]}>
        <SelectBox options={["전체", "2023-12-03 12시", "2023-12-03 17시"]} onClick={() => {}} selectedValue="전체" name={"date"} />
        <strong className={styles["person"]}>총 인원: 2명</strong>
      </div>
      <div className={styles["container"]}>
        <div className={cx("list-row", "list-header")}>
          <strong>이름</strong>
          <strong>이메일</strong>
          <strong>날짜</strong>
        </div>
        <ul className={styles["list"]}>
          {Array(10)
            .fill(item)
            .map((item) => (
              <li className={cx("list-row", "list-item")}>
                <p className={styles["list-item__user"]}>{item.user}</p>
                <p className={styles["list-item__email"]}>{item.email}</p>
                <p>{item.date}</p>
                <Button reverseColor={true}>취소</Button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ReservationListModal;
