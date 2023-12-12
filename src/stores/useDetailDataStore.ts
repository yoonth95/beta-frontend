import { ShowItem } from "@/types/ShowItem";
import { create } from "zustand";

interface useDetailDataStoreType {
  item: ShowItem | null;
  setItemData: (item: ShowItem) => void;
}

export const useDetailDataStore = create<useDetailDataStoreType>((set) => ({
  item: null,
  setItemData: (item) =>
    set(() => ({
      item,
    })),
}));
