import axios from "axios";
import { MemberResponseType } from "@/types";

const getUserProfile = async (login_id: string) => {
  const { data } = await axios.get<MemberResponseType>(`/api/getMember/${login_id}`);
  return data.data[0];
};

export default getUserProfile;
