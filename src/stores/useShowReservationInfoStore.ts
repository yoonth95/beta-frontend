import { ShowReservationInfo } from "@/types/showReservationInfo";
import { create } from "zustand";

interface useShowReservationInfoStoreType {
  showReservationInfo: Pick<ShowReservationInfo, "show_id" | "location" | "price" | "notice"> | null;
  setShowReservationInfo: (item: ShowReservationInfo) => void;
}

export const useShowReservationInfoStore = create<useShowReservationInfoStoreType>((set) => ({
  showReservationInfo: null,
  setShowReservationInfo: (showReservationInfo) =>
    set(() => ({
      showReservationInfo,
    })),
}));
