import { MemberResponseType } from "@/types";
import axios from "axios";

const getUserInfo = async (userId: string) => {
  const { data } = await axios.get<MemberResponseType>(`/api/sign/getMember/${userId}`);
  return data;
};

export default getUserInfo;
