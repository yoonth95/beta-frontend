import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import {
  LoginPage,
  SignupPage,
  MainPage,
  MainConcertPage,
  MainExhibitionPage,
  DetailPage,
  ErrorPage,
  PaySuccessPage,
  PayFailPage,
  Mypage,
  ProfilePage,
  PostManagePage,
  PostUpdatePage,
  PostUploadPage,
  ReservationManagePage,
  LikeManagePage,
  ReviewManagePage,
  StoryManagePage,
  ReservationPage,
} from "@/pages";
import { InfoSection, ReviewSection } from "@/components/detail";

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
            element: <ProfilePage />,
          },
          {
            path: "user",
            children: [
              {
                path: "like",
                element: <LikeManagePage />,
              },
              {
                path: "review",
                element: <ReviewManagePage />,
              },
              {
                path: "story",
                element: <StoryManagePage />,
              },
              {
                path: "reservation",
                element: <ReservationManagePage />,
              },
            ],
          },
          {
            path: "admin",
            children: [
              {
                path: "reservation-manage",
                element: <ReservationManagePage />,
              },
              {
                path: "post",
                element: <PostManagePage />,
              },
              {
                path: "post/upload",
                element: <PostUploadPage />,
              },
              {
                path: "post/update",
                element: <PostUpdatePage />,
              },
            ],
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
