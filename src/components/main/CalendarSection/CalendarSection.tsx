import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateButton } from "@/components/main";
import { BasicCard, Button, FilterButton } from "@/components/common";
import getStringDate from "@/utils/getStringDate";
import getTodayStringDate from "@/utils/getTodayStringDate";
import classNames from "classnames/bind";
import styles from "./CalendarSection.module.css";

const cx = classNames.bind(styles);

const tabsInfo = [
  { url: "/concert", value: "공연" },
  { url: "/exhibition", value: "전시" },
  { url: "/sports", value: "스포츠" },
];

const Calendar = () => {
  const navigate = useNavigate();
  const { todayYear, todayMonth, todayDay, todayString } = getTodayStringDate();
  const [selectedTab, setSelectedTab] = useState("/concert");
  const [selectedDate, setSelectedDate] = useState(todayString);

  const handleClickTab = (value: string) => () => {
    setSelectedTab(value);
  };
  const handleClickDateBtn = (value: string) => () => {
    setSelectedDate(value);
  };

  return (
    <section className={styles.section}>
      <h2 className="a11y-hidden">공연/전시/스포츠</h2>

      <div className={cx("date-btns-group", "no-scroll")}>
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
      <div className={cx("tabs", "no-scroll")}>
        {tabsInfo.map(({ url, value }) => (
          <FilterButton key={value} selected={selectedTab === url} onClick={handleClickTab(url)}>
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
      <Button
        onClick={() => {
          navigate(selectedTab);
        }}
        reverseColor={true}
      >
        더보기
      </Button>
    </section>
  );
};

export default Calendar;
