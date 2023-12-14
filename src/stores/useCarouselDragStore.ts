import { create } from "zustand";

interface useCarouselDragStoreType {
  isDragging: boolean;
  setIsDragging: (state: boolean) => void;
}

export const useCarouselDragStore = create<useCarouselDragStoreType>((set) => ({
  isDragging: false,
  setIsDragging: (state) =>
    set(() => ({
      isDragging: state,
    })),
}));
