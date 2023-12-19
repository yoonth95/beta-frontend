import axios from "axios";
import { ReviewDeleteParamType } from "@/types";

interface ReviewDeleteResponse {
  ok: boolean;
  data: boolean;
}

const deleteReview = async (review: ReviewDeleteParamType) => {
  await axios.delete<ReviewDeleteResponse>("/api/show/review-delete", { data: review });
};

export default deleteReview;
