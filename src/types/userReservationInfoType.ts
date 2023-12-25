export interface ResponseUserReservationInfoType {
  ok: boolean;
  data: UserReservationInfoType[];
}

export interface UserReservationInfoType {
  id: number;
  user_id: number;
  show_id: number;
  show_times_id: number;
  orderId?: string;
  amount?: number;
  is_receive_email: number;
  created_at: string;
  updated_at: string;
  title: string;
  location: string;
  location_detail?: string;
  date_time: string;
  notice: string;
  position: string;
  user_name: string;
  user_email: string;
  phone_number: string;
}
