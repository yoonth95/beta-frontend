import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "@/pages/Error/ErrorPage";
import MainPage from "@/pages/Main/MainPage";
import DetailPage from "@/pages/Detail/DetailPage";
import { InfoSection, ReviewSection } from "@/components/detail";
import LoginPage from "@/pages/Login/LoginPage";
import SignupPage from "@/pages/Signup/SignupPage";
import Mypage from "@/pages/Mypage/Mypage";
import Info from "@/components/detail/Info/Info";
import Review from "@/components/detail/Review/Review";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
        children: [
          {
            path: "info",
            element: <InfoSection />,
          },
          {
            path: "review",
            element: <ReviewSection />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/mypage",
        element: <Mypage />,
      },
    ],
  },
]);

export default router;
