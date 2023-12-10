import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage, SignupPage, MainPage, MainConcertPage, DetailPage, ErrorPage } from "@/pages";
import { InfoSection, ReviewSection } from "@/components/detail";
import Mypage from "@/pages/Mypage/Mypage";

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
        path: "/concert",
        element: <MainConcertPage />,
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
