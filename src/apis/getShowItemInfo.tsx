import axios from "axios";

export const getShowItemInfo = async (showId) => {
  const { data } = await axios.get(`/api/concert/${showId}`);
  return data.data[0];
};
