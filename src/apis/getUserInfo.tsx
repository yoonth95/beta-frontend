import { MemberResponseType } from "@/types";
import axios from "axios";

const getUserInfo = async (userId: string) => {
  const { data } = await axios.get<MemberResponseType>(`/api/getMember/${userId}`);
  return data.data[0];
};

export default getUserInfo;
