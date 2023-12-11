import React, { useState } from "react";
import { DatePeriodPicker, Editor, InputField } from "@/components/common";
import styles from "./ReservationForm.module.css";

const ReservationForm = () => {
  const [roundList, setRoundList] = useState([
    { date: "2023-12-08", time: "오후 1시" },
    { date: "2023-12-08", time: "오후 1시" },
    { date: "2023-12-08", time: "오후 1시" },
  ]);
  return (
    <>
      <InputField type="text">가격</InputField>
      <InputField type="text">총 수용 가능 인원</InputField>
      <section className={styles["round-list"]}>
        <h4>회차</h4>
        {roundList.map((round) => (
          <article className={styles["round-item"]}>
            <div className={styles["round-item__box"]}>
              <div className={styles["round-item__box-row"]}>
                <span>날짜</span>
                {round.date}
              </div>
              <div className={styles["round-item__box-row"]}>
                <span>시간</span>
                {round.time}
              </div>
            </div>
            <button>x</button>
          </article>
        ))}

        <article className={styles["round-item-add"]}>
          <div>
            <span>날짜 및 시간</span>
            {/* <DatePeriodPicker time={true} onChange={setRoundList} /> */}
          </div>
          <button>회차 추가</button>
        </article>
      </section>

      <section>
        <h4>유의사항</h4>
        {/* <Editor /> */}
      </section>
    </>
  );
};

export default ReservationForm;
