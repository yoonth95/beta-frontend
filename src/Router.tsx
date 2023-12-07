import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { LoginPage, SignupPage, MainPage, MainConcertPage, DetailPage, ErrorPage } from "@/pages";

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
        path: "/detail",
        element: <DetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

export default router;
