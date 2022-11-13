import { createContext, useContext } from "react";
import { AppStateStore } from "./AppStateStore";

export const storeContext = createContext<AppStateStore | null>(null);

/** React Redux の useStore に対応するもの。 */
export function useAppStateStore() {
  const store = useContext(storeContext);
  if (!store) {
    throw new Error("Provider で囲んでください");
  }

  return store;
}
