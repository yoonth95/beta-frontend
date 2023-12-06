import { useState } from "react";
import { DateButton } from "@/components/main";
import { BasicCard, FilterButton } from "@/components/common";
import styles from "./CalendarSection.module.css";
import getStringDate from "@/utils/getStringDate";
import getTodayStringDate from "@/utils/getTodayStringDate";

const tabsInfo = ["공연", "전시", "스포츠"];

const Calendar = () => {
  const { todayYear, todayMonth, todayDay, todayString } = getTodayStringDate();
  const [tab, setTab] = useState("공연");
  const [selectedDate, setSelectedDate] = useState(todayString);

  const handleClickTab = (value: string) => () => {
    setTab(value);
  };
  const handleClickDateBtn = (value: string) => () => {
    setSelectedDate(value);
  };

  return (
    <section className={styles.section}>
      <h2 className="a11y-hidden">공연/전시/스포츠</h2>

      <div className={styles["date-btns-group"]}>
        {Array(14)
          .fill(0)
          .map((_item, index) => {
            const { dateString, dayOfWeek } = getStringDate(todayYear, todayMonth, todayDay + index);
            return (
              <DateButton
                key={dateString}
                onClick={handleClickDateBtn(dateString)}
                today={todayString === dateString}
                selected={selectedDate === dateString}
                date={dateString}
                dayOfWeek={dayOfWeek}
              />
            );
          })}
      </div>
      <div className={styles.tabs}>
        {tabsInfo.map((value) => (
          <FilterButton key={value} selected={tab === value} onClick={handleClickTab(value)}>
            {value}
          </FilterButton>
        ))}
      </div>
      <div className={styles["cards-container"]}>
        {Array(10)
          .fill(0)
          .map((_item, index) => {
            return (
              <BasicCard
                key={index}
                item={{
                  id: "1",
                  imgSrc: "/public/card-image.png",
                  title: "서울대 전시회에 놀러오세요",
                  location: "고려대학교 박물관 지하 1층 (백주년기념 삼성관) 기획 전시실 Ⅱ",
                  date: "2023.11.23 - 2023.11.29",
                }}
              />
            );
          })}
      </div>
    </section>
  );
};

export default Calendar;
