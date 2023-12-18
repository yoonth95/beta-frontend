import { NavBar } from "@/components/layouts";
import { Banner, StorySection, CalendarSection } from "@/components/main";
import "react-loading-skeleton/dist/skeleton.css";

const MainPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <Banner />
        <StorySection />
        <CalendarSection />
      </main>
    </>
  );
};

export default MainPage;
