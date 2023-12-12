import { useState } from "react";
import { FilterButton, SelectBox } from "@/components/common";
import getTodayStringDate from "@/utils/getTodayStringDate";
import { useFilterSlide } from "@/hooks";
import classNames from "classnames/bind";
import styles from "./Filters.module.css";

const cx = classNames.bind(styles);

const locations = [
  "전체",
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

const dateFiltersItem = ["오늘", "+7일", "+2주", "직접선택"];
const categories = ["전체", "음악", "연극", "기타"];
const selectOptions = ["전체", "진행중", "진행 예정", "종료"];

const Filters = () => {
  const { scrollRef, scrollValue, handleClickPrev, handleClickNext } = useFilterSlide();
  const { todayString } = getTodayStringDate();

  const [filterInfo, setFilterInfo] = useState({
    date: "오늘",
    start_date: todayString,
    end_date: todayString,
    location: "전체",
    category: "전체",
    progressStatus: "전체",
  });

  const [isDateSelectShow, setIsDateSelectShow] = useState(false);

  const handleClickFilterButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, textContent: value } = e.target as HTMLButtonElement;
    if (name === "date") {
      if (value === "직접선택") {
        setIsDateSelectShow(true);
      } else {
        setIsDateSelectShow(false);
      }
    }

    setFilterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFilterInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className={styles["filter-row"]}>
        <strong className={styles["filter-row__title"]}>날짜</strong>

        <div className={styles["filter-contents"]}>
          {dateFiltersItem.map((item) => (
            <FilterButton key={item} selected={filterInfo.date === item} onClick={handleClickFilterButton} name={"date"}>
              {item}
            </FilterButton>
          ))}
        </div>
      </div>

      {isDateSelectShow && (
        <div className={cx("date-select-container", isDateSelectShow && "show")}>
          <label>
            <p className="a11y-hidden">시작일</p>
            <input className={styles["date-input"]} type="date" name="concert-start" value={filterInfo.start_date} onChange={handleChangeDate} />
          </label>
          <label>
            <p className={"a11y-hidden"}>종료일</p>
            <input className={styles["date-input"]} type="date" name="end_date" value={filterInfo.end_date} onChange={handleChangeDate} />
          </label>
        </div>
      )}

      <div className={styles["filter-row"]}>
        <strong className={styles["filter-row__title"]}>지역</strong>
        <div className={styles["location-filter-contents"]}>
          <div className={cx("arrow", "prev")} onClick={handleClickPrev}></div>
          <div className={cx("arrow", "next")} onClick={handleClickNext}></div>
          <ul ref={scrollRef} style={{ transform: `translateX(${scrollValue})` }}>
            {locations.map((item) => (
              <li key={item}>
                <FilterButton name={"location"} selected={filterInfo.location === item} onClick={handleClickFilterButton}>
                  {item}
                </FilterButton>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {location.pathname === "/concert" && (
        <div className={styles["filter-row"]}>
          <strong className={styles["filter-row__title"]}>카테고리</strong>
          <div className={styles["filter-contents"]}>
            {categories.map((item) => (
              <FilterButton key={item} selected={filterInfo.category === item} onClick={handleClickFilterButton} name={"category"}>
                {item}
              </FilterButton>
            ))}
          </div>
        </div>
      )}

      <div className={styles["filter-row-select"]}>
        <SelectBox options={selectOptions} name={"progressStatus"} onClick={handleClickFilterButton} selectedValue={filterInfo.progressStatus} />
      </div>
    </>
  );
};

export default Filters;
