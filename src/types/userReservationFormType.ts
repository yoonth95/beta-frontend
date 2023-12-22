export interface UserReservationInputsType {
  show_times_id: number;
  is_receive_email: boolean;
  [key: string]: number | boolean;
}

export interface UserReservationFormType {
  show_id: number;
  show_times_id: number;
  is_receive_email: 1 | 0;
}
