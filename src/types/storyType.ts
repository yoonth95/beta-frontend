export interface StoryResponseType {
  ok: boolean;
  data: StoryType[];
}

export interface StoryType {
  id: number;
  login_id: string;
  story_image_url: string;
  story_color: string | null;
  tags: string;
  created_at: string;
  updated_at: string;
}
