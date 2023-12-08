import { NavBar } from "@/components/layouts";
import { Filters, ConcertListSection } from "@/components/mainConcert";

const MainConcertPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <Filters />
        <ConcertListSection />
      </main>
    </>
  );
};

export default MainConcertPage;
