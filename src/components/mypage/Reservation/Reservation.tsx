import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Reservation.module.css";

const cx = classNames.bind(styles);

const Reservation = () => {
  return (
    <div className={styles["reservation-container"]}>
      <div className={styles["reservation-box"]}>
        <img className={styles["reservation-img"]} src="" alt="" />
        <div className={styles["reservation-item"]}>
          <div>
            <h3>제목 : </h3>
            <p>장소</p>
            <p>날짜</p>
          </div>
          <button className={styles["reservation-delete-button"]}>예매 정보</button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
