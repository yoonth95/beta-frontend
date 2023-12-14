export interface StoryResponseType {
  ok: boolean;
  data: StoryType[];
}

export interface StoryType {
  id: number;
  user_id: number;
  story_image_url: string;
  tags: string;
  created_at: string;
  updated_at: string;
}
