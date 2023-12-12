import axios from "axios";

export const getShowItemInfo = async (showId) => {
  const { data } = await axios.get(`http://localhost:3000/api/concert/${showId}`);
  return data.data[0];
};
