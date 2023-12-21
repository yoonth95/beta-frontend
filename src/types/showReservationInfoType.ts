export interface ShowReservationInfoResponseType {
  ok: string;
  data: ShowReservationInfoType[];
}

export interface ShowReservationInfoType {
  id: number;
  show_id: number;
  method: "google" | "agency";
  google_form_url: null | string;
  location: string;
  location_detail: string | null;
  position: string;
  price: number | null;
  head_count: number | null;
  notice: Notice | null;
  date_time: ShowDateTime[];
  title: string;
}

export type AgencyReservationInfoType = Omit<ShowReservationInfoType, "method" | "google_form_url">;

interface ShowDateTime {
  id: number;
  show_id: number;
  date_time: string;
  head_count: number;
}

export interface Notice {
  type: string;
  data: number[];
}
