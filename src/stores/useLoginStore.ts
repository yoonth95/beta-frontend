import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  login_id: string;
  user_name: string;
  user_role: string;
}

interface useLoginStoreState {
  userState: UserState;
  setUserState: (newState: UserState) => void;
}

export const useLoginStore = create(
  persist<useLoginStoreState>(
    (set) => ({
      userState: {
        login_id: "",
        user_name: "",
        user_role: "",
      },
      setUserState: (newState) => set({ userState: newState }),
    }),
    {
      name: "user-storage",
    },
  ),
);
