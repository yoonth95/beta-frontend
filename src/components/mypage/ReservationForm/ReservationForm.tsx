import React, { useState } from "react";
import { DatePicker, Editor, InputField, DeleteButton } from "@/components/common";
import styles from "./ReservationForm.module.css";
import { DateInputType } from "@/types";

const ReservationForm = ({ form, onChange, roundList, setRoundList, editorNoticeData, setEditorNoticeData }) => {
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
    setRoundList([...roundList, dateTime]);
    // TODO: datePicker 값 초기화
  };

  const handleRoundRemove = ({ round: removeRound }) => {
    setRoundList((prev) => prev.filter((round) => round !== removeRound));
  };

  return (
    <div className={styles["reservation-form-wrapper"]}>
      <InputField type="text" name="price" value={form.price} onChange={onChange}>
        가격
      </InputField>
      <InputField type="text" name="head_count" value={form.head_count} onChange={onChange}>
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
            <DeleteButton spanHidden="해당 회차 삭제" onClick={() => handleRoundRemove({ round })} />
          </article>
        ))}

        <article className={styles["round-item-add"]}>
          <div className={styles["round-item-add__dateTime"]}>
            <span className={styles["round-item__title"]}>날짜 및 시간</span>
            <DatePicker type="dateWithTime" onChange={handleDateTimeInput} />
          </div>
          <button type="button" className={styles["round-item-add__btn"]} onClick={handleRoundAdd}>
            회차 추가
          </button>
        </article>
      </section>

      <section>
        <h4 className={styles["title"]}>유의사항</h4>
        <Editor editorData={editorNoticeData} setEditorData={setEditorNoticeData} />
      </section>
    </div>
  );
};

export default ReservationForm;
