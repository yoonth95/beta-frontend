import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

interface PropsType {
  // name: string;
  // placeholderText: string;
  startDate?: string;
  endDate?: string;
  onChange: React.Dispatch<React.SetStateAction<DateInputType | null>>;
  type: "period" | "dateWithTime";
}

interface DateInputType {
  target: {
    name: string;
    value: string | { date: string; time: string };
  };
}

// Fri Dec 15 2023 00:00:00 GMT+0900 (한국 표준시) -> 2023/12/15
const formattingDate = (dateObject) => {
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}/${month}/${day}`;
  console.log(formattedDate);
  return formattedDate;
};

// Fri Dec 15 2023 00:00:00 GMT+0900 (한국 표준시) -> 오전 0:00
const formattingTime = (dateObject) => {
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "오후" : "오전";
  const formattedTime = `${period} ${hours % 12}:${minutes}`;
  console.log(formattedTime);
  return formattedTime;
};

const DatePeriodPicker: React.FC<PropsType> = ({ startDate: defaultStartDate, endDate: defaultEndDate, onChange, type }) => {
  const [startDate, setStartDate] = useState<Date | null>((defaultStartDate && new Date(defaultStartDate)) || null);
  const [endDate, setEndDate] = useState<Date | null>((defaultEndDate && new Date(defaultEndDate)) || null);

  const handleChangeDateWithTimeInput = (name: string, value: Date) => {
    const dateObject = new Date(value);
    console.log(dateObject);
    const date = formattingDate(dateObject);
    const time = formattingTime(dateObject);
    const event = { target: { name, value: { date, time } } };
    onChange(event);
  };

  const handleChangePeriodInput = (name: string, value: Date) => {
    const dateObject = new Date(value);
    const date = formattingDate(dateObject);
    const event = { target: { name, value: date } };
    onChange(event);
  };

  switch (type) {
    case "dateWithTime": {
      return (
        <ReactDatePicker
          showIcon
          locale={ko}
          name="start_date_time"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            handleChangeDateWithTimeInput("start_date_time", date);
          }}
          dateFormat="yyyy/MM/dd - aa h:mm"
          showTimeSelect
        />
      );
    }

    case "period": {
      return (
        <>
          <ReactDatePicker
            showIcon
            locale={ko}
            name="start_date"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              handleChangePeriodInput("start_date", date);
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
          />
          <ReactDatePicker
            showIcon
            locale={ko}
            name="end_date"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
              handleChangePeriodInput("end_date", date);
            }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy/MM/dd"
          />
        </>
      );
    }

    default:
      return;
  }
};

export default DatePeriodPicker;
