import React, { forwardRef, useState } from "react";
import ko from "date-fns/locale/ko";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import styles from "./DatePicker.module.css";
import CalendarIcon from "@/assets/icon-calendar.svg?react";
import { DateInputType } from "@/types";

interface PropsType {
  startDate?: string;
  endDate?: string;
  onChange: (event: DateInputType) => void;
  type: "period" | "dateWithTime";
}

// Fri Dec 15 2023 00:00:00 GMT+0900 (한국 표준시) -> 2023/12/15
const formattingDate = (dateObject: Date) => {
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  console.log(formattedDate);
  return formattedDate;
};

// Fri Dec 15 2023 00:00:00 GMT+0900 (한국 표준시) -> 오전 0:00
const formattingTime = (dateObject: Date) => {
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "오후" : "오전";
  const formattedTime = `${period} ${hours % 12}:${minutes}`;
  console.log(formattedTime);
  return formattedTime;
};

const DatePicker: React.FC<PropsType> = ({ startDate: defaultStartDate, endDate: defaultEndDate, onChange, type }) => {
  const [startDate, setStartDate] = useState<Date | null>((defaultStartDate && new Date(defaultStartDate)) || null);
  const [endDate, setEndDate] = useState<Date | null>((defaultEndDate && new Date(defaultEndDate)) || null);

  const handleChangeDateWithTimeInput = (name: string, value: Date) => {
    const dateObject = new Date(value);
    console.log(dateObject);
    const date = formattingDate(dateObject);
    const time = formattingTime(dateObject);
    const event: DateInputType = { target: { name, value: { date, time } } };
    onChange(event);
  };

  const handleChangePeriodInput = (name: string, value: Date) => {
    const dateObject = new Date(value);
    const date = formattingDate(dateObject);
    const event: DateInputType = { target: { name, value: date } };
    onChange(event);
  };

  const CustomInput = forwardRef((props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className={styles["calendar-input-wrap"]}>
        <input {...props} ref={ref} type="text" className={styles["calendar-input"]} />
        <CalendarIcon />
      </div>
    );
  });

  switch (type) {
    case "dateWithTime": {
      return (
        <ReactDatePicker
          locale={ko}
          customInput={<CustomInput />}
          name="start_date_time"
          selected={startDate}
          onChange={(date: Date) => {
            setStartDate(date);
            handleChangeDateWithTimeInput("start_date_time", date);
          }}
          dateFormat="yyyy/MM/dd - aa h:mm"
          showTimeSelect
          placeholderText="날짜 및 시간"
          autoComplete="off"
        />
      );
    }

    case "period": {
      return (
        <>
          <div>
            <ReactDatePicker
              locale={ko}
              customInput={<CustomInput />}
              name="start_date"
              selected={startDate}
              onChange={(date: Date) => {
                setStartDate(date);
                handleChangePeriodInput("start_date", date);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="시작일"
              autoComplete="off"
            />
          </div>
          <span className={styles["wave"]}>~</span>
          <div>
            <ReactDatePicker
              locale={ko}
              customInput={<CustomInput />}
              name="end_date"
              selected={endDate}
              onChange={(date: Date) => {
                setEndDate(date);
                handleChangePeriodInput("end_date", date);
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy/MM/dd"
              placeholderText="종료일"
              autoComplete="off"
            />
          </div>
        </>
      );
    }

    default:
      return;
  }
};

export default DatePicker;
