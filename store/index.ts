import { createContext, useContext } from "react";
import { ThemeStore } from "./themeStore";
import { UserStore } from "./userStore";
import { AsyncTrunk } from "mobx-sync";

export class RootStore {
  themeStore: ThemeStore;
  userStore: UserStore;

  constructor() {
    this.themeStore = new ThemeStore();
    this.userStore = new UserStore();
  }
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);

export const reHydrateLocalStorage = async (store: any[]) => {
  if (typeof window !== "undefined") {
    const trunk = new AsyncTrunk(store, {
      storage: localStorage,
    });
    await trunk.init();
  }
};

export const reHydrateSessionStorage = async (store: any[]) => {
  if (typeof window !== "undefined") {
    const trunk = new AsyncTrunk(store, {
      storage: sessionStorage,
    });
    await trunk.init();
  }
};
