import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";

interface PropsType {
  // name: string;
  // placeholderText: string;
  startDate: string;
  endDate: string;
  onChange: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DatePeriodPicker: React.FC<PropsType> = ({ startDate: defaultStartDate, endDate: defaultEndDate, onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(defaultStartDate));
  const [endDate, setEndDate] = useState<Date | null>(new Date(defaultEndDate));

  const handleChange = (name, value) => {
    const date = new Date(value)
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "-")
      .slice(0, -1);
    const event = { target: { name, value: date } };
    onChange(event);
  };

  return (
    // <ReactDatePicker
    //   showIcon
    //   locale={ko}
    //   name={name}
    //   selected={selectedDate}
    //   onChange={handleDateChange}
    //   dateFormat="yyyy/MM/dd"
    //   placeholderText={placeholderText}
    // />
    <>
      <ReactDatePicker
        showIcon
        locale={ko}
        name="start_date"
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          handleChange("start_date", date);
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
          handleChange("end_date", date);
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="yyyy/MM/dd"
      />
    </>
  );
};

export default DatePeriodPicker;
