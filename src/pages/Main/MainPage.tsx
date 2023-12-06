import { NavBar } from "@/components/layouts";
import { Banner, StorySection, CalendarSection } from "@/components/main";

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
