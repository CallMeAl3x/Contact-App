import create from "zustand";

const useStore = create((set) => ({
  searchValue: "",
  setSearchValue: (value) => set(() => ({ searchValue: value })),
}));

export default useStore;
