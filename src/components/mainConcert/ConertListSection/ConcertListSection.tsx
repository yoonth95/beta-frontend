import { useQuery } from "@tanstack/react-query";
import { TicketCard } from "@/components/common/";
import { getShows } from "@/apis";
import { ShowFilterRequestType } from "@/types";
import styles from "./ConcertListSection.module.css";

interface PropsType {
  filterRequest: ShowFilterRequestType;
}

const ConcertListSection: React.FC<PropsType> = ({ filterRequest }) => {
  const { start_date, end_date, location, category, progress } = filterRequest;
  const { data, status, error } = useQuery({
    queryKey: ["concertData", filterRequest],
    queryFn: async () => await getShows("concert", start_date, end_date, location, progress, category),
  });

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <section className={styles["section"]}>
      <h2 className="a11y-hidden">공연 리스트</h2>
      <ul className={styles["concert-list"]}>
        {data.map((item) => (
          <li key={item.id}>
            <TicketCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ConcertListSection;
