import axios from "axios";

interface PostReservationParamType {
  orderId?: string;
  amount?: string;
  show_id: number;
  show_times_id: number;
  is_receive_email: 1 | 0;
}

const postReservation = async (data: PostReservationParamType) => {
  try {
    const result = await axios.post("/api/confirm", data);
    return result.data;
  } catch (err) {
    throw "서버 요청 실패";
  }
};

export default postReservation;
