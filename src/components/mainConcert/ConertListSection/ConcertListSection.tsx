import { TicketCard } from "@/components/mainConcert";
import styles from "./ConcertListSection.module.css";

const ConcertListSection = () => {
  const item = {
    id: "1",
    imgSrc: "/public/concert-img.jpg",
    title: "서울대 전시회에 놀러오세요",
    location: "고려대학교 박물관 지하 1층 (백주년기념 삼성관) 기획 전시실 Ⅱ",
    date: "2023.11.23 - 2023.11.29",
  };

  return (
    <section className={styles["section"]}>
      <h2 className="a11y-hidden">공연 리스트</h2>
      <ul className={styles["concert-list"]}>
        {Array(9)
          .fill(0)
          .map(() => (
            <li>
              <TicketCard item={item} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ConcertListSection;
