import axios from "axios";

export const getUserInfo = async (userId) => {
  const { data } = await axios.get(`http://localhost:3000/api/getMember/${userId}`);
  return data.data[0];
};
