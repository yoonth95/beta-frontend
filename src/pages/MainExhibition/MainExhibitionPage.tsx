import React from "react";
import { NavBar } from "@/components/layouts";
import { Filters } from "@/components/common";
import { ExhibitionListSection } from "@/components/mainExhibition/";

const MainExhibitionPage = () => {
  return (
    <>
      <NavBar />
      <main>
        <Filters />
        <ExhibitionListSection />
      </main>
    </>
  );
};

export default MainExhibitionPage;
