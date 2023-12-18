import React, { useState } from "react";
import { DatePicker, Editor, InputField } from "@/components/common";
import styles from "./ReservationForm.module.css";
import { DateInputType } from "@/types";

const ReservationForm = () => {
  const onChange = () => {
    // 임시 함수 (useInputs 훅으로 변경 예정)
  };
  const [roundList, setRoundList] = useState([
    { date: "2023-12-08", time: "오후 1시" },
    { date: "2023-12-08", time: "오후 1시" },
    { date: "2023-12-08", time: "오후 1시" },
  ]);

  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  const handleDateTimeInput = (event: DateInputType) => {
    if (typeof event.target.value === "object") {
      const { date, time } = event.target.value;
      setDateTime({ ...dateTime, date, time });
    }
  };

  const handleRoundAdd = () => {
    // roundList 추가
  };
  return (
    <div className={styles["reservation-form-wrapper"]}>
      <InputField type="text" value={""} onChange={onChange}>
        가격
      </InputField>
      <InputField type="text" value={""} onChange={onChange}>
        총 수용 가능 인원
      </InputField>
      <section className={styles["round-list"]}>
        <h4 className={styles["title"]}>회차</h4>
        {roundList.map((round, index) => (
          <article key={index} className={styles["round-item"]}>
            <div className={styles["round-item__box"]}>
              <div className={styles["round-item__box-row"]}>
                <span className={styles["round-item__title"]}>날짜</span>
                <span className={styles["round-item__content"]}>{round.date}</span>
              </div>
              <div className={styles["round-item__box-row"]}>
                <span className={styles["round-item__title"]}>시간</span>
                <span className={styles["round-item__content"]}>{round.time}</span>
              </div>
            </div>
            <button>x</button>
          </article>
        ))}

        <article className={styles["round-item-add"]}>
          <div className={styles["round-item-add__dateTime"]}>
            <span className={styles["round-item__title"]}>날짜 및 시간</span>
            <DatePicker type="dateWithTime" onChange={handleDateTimeInput} />
          </div>
          <button className={styles["round-item-add__btn"]} onClick={handleRoundAdd}>
            회차 추가
          </button>
        </article>
      </section>

      <section>
        <h4 className={styles["title"]}>유의사항</h4>
        <Editor />
      </section>
    </div>
  );
};

export default ReservationForm;
