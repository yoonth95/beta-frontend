export interface UserReservationInputsType {
  show_times_id: number;
  is_receive_email: boolean;
  [key: string]: number | boolean;
}

export interface UserReservationFormType {
  user_id: number;
  show_id: number;
  show_times_id: number;
  is_receive_email: number;
}
