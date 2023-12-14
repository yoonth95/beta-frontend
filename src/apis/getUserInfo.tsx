import axios from "axios";

export const getUserInfo = async (userId) => {
  const { data } = await axios.get(`/api/getMember/${userId}`);
  return data.data[0];
};
