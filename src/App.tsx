import { useLocation } from "react-router-dom";
import { Header } from "./components/layouts";
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && <Header />}
      <PrivateRoute />
    </>
  );
}

export default App;
