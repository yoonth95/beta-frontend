import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DateButton } from "@/components/main";
import { BasicCard, Button, FilterButton } from "@/components/common";
import getStringDate from "@/utils/getStringDate";
import getTodayStringDate from "@/utils/getTodayStringDate";
import { getShows } from "@/apis";
import { ShowType } from "@/types/";
import classNames from "classnames/bind";
import styles from "./CalendarSection.module.css";
import CalendarSectionSkeleton from "./CalendarSectionSkeleton";

const cx = classNames.bind(styles);

const tabsInfo = [
  { url: "concert", value: "공연" },
  { url: "exhibition", value: "전시" },
  { url: "sports", value: "스포츠" },
];

const CalendarSection = () => {
  const navigate = useNavigate();
  const { todayYear, todayMonth, todayDay, todayString } = getTodayStringDate();
  const [selectedTab, setSelectedTab] = useState("concert");
  const [selectedDate, setSelectedDate] = useState(todayString);

  const { status, data, error } = useQuery({
    queryKey: ["showDatas", selectedTab, selectedDate],
    queryFn: async () => await getShows(selectedTab, selectedDate, selectedDate),
    select: (item) => item.slice(0, 7),
  });

  const handleClickTab = (value: string) => () => {
    setSelectedTab(value);
  };
  const handleClickDateBtn = (value: string) => () => {
    setSelectedDate(value);
  };

  if (status === "error") return <div>{error.message}</div>;

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
        {status === "pending" && <CalendarSectionSkeleton />}
        {data?.map((item: ShowType) => {
          return <BasicCard key={item.id} item={item} />;
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

export default CalendarSection;
