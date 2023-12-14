import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/layouts";
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();

  const isPrivateRoute = location.pathname.startsWith("/mypage");
  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && <Header />}
      {isPrivateRoute ? <PrivateRoute /> : <Outlet />}
    </>
  );
}

export default App;
