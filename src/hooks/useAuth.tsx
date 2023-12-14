import { useEffect } from "react";
import { verifyTokenAPI } from "@/apis/getVerifyToken";
import { useLoginStore } from "@/stores/useLoginStore";

interface PropsType {
  isLogin: boolean;
  login_id: string;
  user_name: string;
  user_role: string;
}

const useAuth = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setData: React.Dispatch<React.SetStateAction<PropsType | null>>, // 수정된 타입
  setIsError: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { setUserState } = useLoginStore();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await verifyTokenAPI();
        setIsLoading(false);
        setData(res);
        setUserState(res); // setUserState를 호출하여 전역 상태 업데이트
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, [setIsLoading, setData, setIsError, setUserState]);
};

export default useAuth;
