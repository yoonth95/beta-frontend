import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage, SignupPage, MainPage, MainConcertPage, DetailPage, ErrorPage, MainExhibitionPage, PaySuccessPage, PayFailPage } from "@/pages";
import { InfoSection, ReviewSection } from "@/components/detail";
import Mypage from "@/pages/Mypage/Mypage";
import { Profile, LikeManage, ReviewManage, StoryManage, Reservation, ReservationManage, PostManage, PostUpload } from "@/components/mypage";

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
        path: "/exhibition",
        element: <MainExhibitionPage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
        children: [
          {
            index: true,
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
        children: [
          {
            index: true,
            path: "profile",
            element: <Profile />,
          },
          {
            path: "like",
            element: <LikeManage />,
          },
          {
            path: "review",
            element: <ReviewManage />,
          },
          {
            path: "story",
            element: <StoryManage />,
          },
          {
            path: "reservation",
            element: <Reservation />,
          },
          {
            path: "reservation-manage",
            element: <ReservationManage />,
          },
          {
            path: "post",
            element: <PostManage />,
          },
          {
            path: "post/upload",
            element: <PostUpload />,
          },
        ],
      },
      {
        path: "/payment",
        children: [
          {
            path: "success",
            element: <PaySuccessPage />,
          },
          {
            path: "fail",
            element: <PayFailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
