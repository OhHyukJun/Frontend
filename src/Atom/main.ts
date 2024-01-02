import { atom, selector } from "recoil";
import { MainItem } from "../interface/main";

export const mainItemState = atom<MainItem[]>({
    key: 'mainItemState',
    default: [],
  });

  export const mainItem1State = atom<MainItem[]>({
    key: 'mainItem1State',
    default: [],
  });

  export const mainItem2State = atom<MainItem[]>({
    key: 'mainItem2State',
    default: [],
  });