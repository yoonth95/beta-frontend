export interface ShowItemInfo {
  id: number;
  show_type: string;
  show_sub_type: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  position: string;
  main_image_url: string;
  sub_images_url: string;
  univ: string;
  department: string;
  tags: string;
  content: Content;
  is_reservation: number;
  created_at: string;
}

export interface Content {
  type: string;
  data: number[];
}
