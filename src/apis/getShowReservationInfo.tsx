import axios from "axios";

export const getShowReservationInfo = async (showId) => {
  const { data } = await axios.get(`http://localhost:3000/api/show/reservation/${showId}`);
  return data.data[0];
};
