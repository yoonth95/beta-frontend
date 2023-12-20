export interface ShowReservationInfoResponseType {
  ok: string;
  data: ShowReservationInfoType[];
}

export interface ShowReservationInfoType {
  id: number;
  show_id: number;
  method: string | null;
  google_form_url: string | null;
  location: string;
  location_detail: string | null;
  position: string;
  price: number | null;
  head_count: number | null;
  notice: string | null;
  date_time: DateTime[];
  title: string;
}

export interface DateTime {
  id: number;
  show_id: number;
  date_time: string;
  head_count: number;
}
