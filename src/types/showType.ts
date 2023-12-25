export interface ShowResponseType {
  ok: boolean;
  data: ShowType[];
}

export interface ShowType {
  id: number;
  show_type: string;
  show_sub_type: string | null;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  location_detail: string | null;
  position: string;
  main_image_url: string;
  sub_images_url: string | null;
  main_image_color: string | null;
  univ: string;
  department: string;
  tags: string | null;
  content: string;
  is_reservation: number;
  user_liked?: 0 | 1;
  created_at: string;
  user_reserved?: 0 | 1;
}

export interface ShowFilterRequestType {
  start_date: string;
  end_date: string;
  location: string;
  category?: string;
  progress: string;
}
