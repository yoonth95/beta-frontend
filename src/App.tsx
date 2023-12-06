import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/layouts";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && <Header />}
      <Outlet />
    </>
  );
}

export default App;
