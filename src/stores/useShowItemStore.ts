import { ShowItem } from "@/types/ShowItem";
import { create } from "zustand";

interface useShowItemInfoStoreType {
  item: ShowItem | null;
  setItemData: (item: ShowItem) => void;
}

export const useShowItemStore = create<useShowItemInfoStoreType>((set) => ({
  item: null,
  setItemData: (item) =>
    set(() => ({
      item,
    })),
}));
