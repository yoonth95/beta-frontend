import { ShowResponseType } from "@/types";
import axios from "axios";

export const getShowInfo = async (showId: string) => {
  // TODO: API URL concert, exhibition ?
  // TODO: try catch
  const { data } = await axios.get<ShowResponseType>(`/api/concert/${showId}`);
  return data.data[0];
};
