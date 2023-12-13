import { ShowItemInfo } from "@/types/showItemInfo";
import { create } from "zustand";

interface useShowItemInfoStoreType {
  showItemInfo: ShowItemInfo | null;
  setShowItemInfo: (item: ShowItemInfo) => void;
}

export const useShowItemInfoStore = create<useShowItemInfoStoreType>((set) => ({
  showItemInfo: null,
  setShowItemInfo: (showItemInfo) =>
    set(() => ({
      showItemInfo,
    })),
}));
