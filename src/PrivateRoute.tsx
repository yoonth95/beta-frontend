import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const PrivateRoute = () => {
  const { isLoading, isError, user } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>error</div>;

  const isMyPage = location.pathname.startsWith("/mypage");

  // console.log(user);

  if (isMyPage && !user.isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
