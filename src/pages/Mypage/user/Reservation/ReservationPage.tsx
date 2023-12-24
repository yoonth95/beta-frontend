import styles from "./ReservationPage.module.css";

const ReservationPage = () => {
  return (
    <>
      <div className={styles["reservation-container"]}>
        <div className={styles["reservation-box"]}>
          <img className={styles["reservation-img"]} src="" alt="" />
          <div className={styles["reservation-item"]}>
            <div className={styles["reservation-info-text"]}>
              <p>
                <strong>제목</strong>
                <span className="ellipsis">홍익대학교홍익대학교홍익대학교 시각디자인학과 졸전</span>
              </p>
              <p>
                <strong>장소</strong>
                <span className="ellipsis">서울특별시 마포구 와우산로 94</span>
              </p>
              <p>
                <strong>날짜</strong>
                <span className="ellipsis">2022-12-04 ~ 2023-12-12</span>
              </p>
            </div>
            <div className={styles["reservation-info-button"]}>
              <button className={styles["reservation-delete-button"]}>예매 정보</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
