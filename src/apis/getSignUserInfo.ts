import axios from "axios";

interface SignUserInfoResponseType {
  ok: boolean;
  data: string;
}

const getSignUserInfo = async (userId: string) => {
  const { data } = await axios.get<SignUserInfoResponseType>(`/api/sign/getMember/${userId}`);
  return data;
};

export default getSignUserInfo;
