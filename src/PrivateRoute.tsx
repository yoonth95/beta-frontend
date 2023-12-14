import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { verifyToken } from "@/apis/getVerifyToken";

const PrivateRoute = () => {
  const location = useLocation();

  const { data, status, error } = useQuery({
    queryKey: ["verifyTokenData"],
    queryFn: () => verifyToken(),
  });

  if (status === "pending") return <h1>loading...</h1>;
  if (status === "error") return <h1>{error.message}</h1>;

  return data ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
