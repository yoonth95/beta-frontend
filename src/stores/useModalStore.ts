import { create } from "zustand";

interface useModalStoreType {
  isOpenModal: boolean;
  setIsOpenModal: (isValue: boolean) => void;
}

export const useModalStore = create<useModalStoreType>((set) => ({
  isOpenModal: false,
  setIsOpenModal: (isValue) =>
    set(() => ({
      isOpenModal: isValue,
    })),
}));
