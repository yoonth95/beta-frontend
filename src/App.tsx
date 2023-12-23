import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./components/layouts";
import { useModalStore } from "./stores/useModalStore";
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();
  const { setOpenModal } = useModalStore();
  useEffect(() => {
    setOpenModal({ state: false, type: "" });
  }, [location.pathname]);

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && <Header />}
      <PrivateRoute />
    </>
  );
}

export default App;
