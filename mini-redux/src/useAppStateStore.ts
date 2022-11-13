import { createContext, useContext } from "react";
import { AppStateStore } from "./AppStateStore";

export const storeContext = createContext<AppStateStore | null>(null);

export function useAppStateStore() {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error("Provider で囲んでください");
  }

  return store;
}
