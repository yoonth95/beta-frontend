import { useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

interface PropsType {
  isLogin: boolean;
  login_id: string;
  user_name: string;
  user_role: string;
}

const PrivateRoute = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<null | PropsType>(null);

  useAuth(setIsLoading, setData, setIsError);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>error</div>;

  return data?.isLogin ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
