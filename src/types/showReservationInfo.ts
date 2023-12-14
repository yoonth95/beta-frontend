export interface ShowReservationInfo {
  id: number;
  show_id: number;
  method: string;
  google_form_url: string;
  location: string;
  position: string;
  price: number;
  head_count: number;
  notice: Notice;
}

export interface Notice {
  type: string;
  data: number[];
}
