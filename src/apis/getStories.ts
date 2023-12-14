import { StoryResponseType } from "@/types";
import axios from "axios";

const getStories = async () => {
  const { data } = await axios<StoryResponseType>("/api/storyAll");
  return data.data;
};

export default getStories;
