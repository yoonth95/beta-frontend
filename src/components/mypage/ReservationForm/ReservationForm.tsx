import React, { useState } from "react";
import { DatePeriodPicker, Editor, InputField } from "@/components/common";
import styles from "./ReservationForm.module.css";

const ReservationForm = () => {
  const [roundList, setRoundList] = useState([
    { date: "2023-12-08", time: "오후 1시" },
    { date: "2023-12-08", time: "오후 1시" },
    { date: "2023-12-08", time: "오후 1시" },
  ]);

  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const handleDateTimeInput = (event) => {
    const { date, time } = event.target.value;
    setDateTime({ ...dateTime, date, time });
  };

  const handleRoundAdd = () => {
    // roundList 추가
  };
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
            <DatePeriodPicker type="dateWithTime" onChange={handleDateTimeInput} />
          </div>
          <button onClick={handleRoundAdd}>회차 추가</button>
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
