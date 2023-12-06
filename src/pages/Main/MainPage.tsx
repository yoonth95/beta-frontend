import { Header, NavBar } from "@/components/layouts";
import { Banner, StorySection, CalendarSection } from "@/components/main";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <>
      <Header />
      <NavBar />
      <main className={styles.main}>
        <Banner />
        <StorySection />
        <CalendarSection />
      </main>
    </>
  );
};

export default MainPage;
