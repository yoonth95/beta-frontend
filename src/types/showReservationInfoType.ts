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
  notice: Notice | null;
}

export interface Notice {
  type: string;
  data: number[];
}
