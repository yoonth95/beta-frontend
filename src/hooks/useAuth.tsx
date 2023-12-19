import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyTokenAPI } from "@/apis/getVerifyToken";
import { useLoginStore } from "@/stores/useLoginStore";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { userState, setUserState } = useLoginStore();
  const { pathname } = useLocation();

  const verifyToken = async () => {
    try {
      const res = await verifyTokenAPI();
      setUserState(res);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setUserState({ isLogin: false, login_id: "", user_name: "", user_role: "" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, [pathname]); // Removed pathname dependency to avoid unnecessary re-verifications

  return { isLoading, isError, user: userState };
};

export default useAuth;
