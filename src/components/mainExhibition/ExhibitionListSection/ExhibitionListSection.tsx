import { useQuery } from "@tanstack/react-query";
import { BasicCard } from "@/components/common";
import { getShows } from "@/apis";
import { ShowFilterRequestType } from "@/types/";
import styles from "./ExhibitionListSection.module.css";

interface PropsType {
  filterRequest: ShowFilterRequestType;
}

const ExhibitionListSection: React.FC<PropsType> = ({ filterRequest }) => {
  const { start_date, end_date, location, progress } = filterRequest;
  const { data, status, error } = useQuery({
    queryKey: ["exhibitionData", filterRequest],
    queryFn: async () => await getShows("exhibition", start_date, end_date, location, progress),
  });

  if (status === "pending") return <>loading...</>;
  if (status === "error") return <>{error.message}</>;

  return (
    <section className={styles["section"]}>
      <h2 className="a11y-hidden">전시 리스트</h2>
      <ul className={styles["exhibition-list"]}>
        {data.map((item) => (
          <li>
            <BasicCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExhibitionListSection;
