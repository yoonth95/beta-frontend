import { create } from "zustand";

export interface Item {
  id: number;
  organizer: string;
  imgSrc: string[];
  title: string;
  location: string;
  date: string;
  tags: string[];
  position: Position;
}

export interface Position {
  lat: number;
  lng: number;
}

interface useDetailDataStoreType {
  item: Item;
  setItemData: (item: Item) => void;
}

export const useDetailDataStore = create<useDetailDataStoreType>((set) => ({
  item: {
    id: 1,
    organizer: "서울대학교 미술학과",
    imgSrc: ["/concert-img.jpg", "/concert-img2.jpg", "/concert-img3.jpg", "/card-image.png"],
    title: "고려대 전시회에 놀러오세요",
    location: "고려대학교 박물관 지하 1층 (백주년기념 삼성관) 기획 전시실 Ⅱ",
    date: "2023.11.23 - 2023.11.29",
    tags: ["abc", "def", "ghi", "jkl", "mno"],
    position: {
      lat: 37.5069494959122,
      lng: 127.055596615858,
    },
  },
  setItemData: (item) =>
    set(() => ({
      item,
    })),
}));
