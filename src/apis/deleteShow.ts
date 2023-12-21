import axios from "axios";

interface ShowDeleteResponse {
  ok: boolean;
  data: string;
}

const deleteShow = async (show_id: string) => {
  const { data } = await axios.delete<ShowDeleteResponse>(`/api/show/delete/${show_id}`);
  return data.ok;
};

export default deleteShow;
