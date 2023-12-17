export interface MemberResponseType {
  ok: boolean;
  data: MemberType[];
}

export interface MemberType {
  id: number;
  user_name: string;
  user_email: string;
  login_id: string;
  birth_date: string;
  gender: number;
  phone_number: string;
  user_role: string;
  created_at: string;
}
