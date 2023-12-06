import React from "react";
import styles from "./DateButton.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

interface PropsType {
  selected: boolean;
  date: string;
  today: boolean;
  dayOfWeek: number;
  onClick: () => void;
}
const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

const DateButton: React.FC<PropsType> = ({ selected, date, dayOfWeek, today, onClick }) => {
  return (
    <button type="button" className={cx("button", selected && "selected")} onClick={onClick}>
      {selected && today && <span>Today</span>}
      {selected && !today && <span>{days[dayOfWeek]}</span>}
      <strong>{date.split("-")[2]}</strong>
    </button>
  );
};

export default DateButton;
