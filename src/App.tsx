import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./components/layouts";
import { useModalStore } from "./stores/useModalStore";
import PrivateRoute from "./PrivateRoute";

function App() {
  const location = useLocation();
  const { setOpenModal } = useModalStore();

  useEffect(() => {
    if (location.state?.from !== "detail") window.scrollTo(0, 0);
    setOpenModal({ state: false, type: "" });
  }, [location.pathname, setOpenModal]);

  return (
    <>
      {location.pathname !== "/signup" && location.pathname !== "/login" && <Header />}
      <PrivateRoute />
    </>
  );
}

export default App;
