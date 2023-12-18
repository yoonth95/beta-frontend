import axios from "axios";
import { ReviewsGetResponse } from "@/types";

const getReviews = async (show_id: string) => {
  const { data } = await axios<ReviewsGetResponse>(`/api/detail/${show_id}/review`);

  return data.data;
};

export default getReviews;

// async getComment(videoId: string, pageParam: number) {
//   const limit = 5;
//   const start = pageParam * limit;
//   const end = (pageParam + 1) * limit - 1;

//   const data = response.data || [];
//   const totalCount = response.count;
//   const nextPageToken = data.length === limit ? pageParam + 1 : undefined;

//   const newDic = {
//     items: data,
//     nextPageToken,
//     pageInfo: {
//       totalResults: totalCount,
//       resultsPerPage: data.length,
//     },
//   };

//   return newDic;
// }
