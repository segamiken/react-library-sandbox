import { createContext, useEffect, useReducer } from "react";
import { useAppStateStore } from "./useAppStateStore";

export interface AppState {
  articles: {
    id: string;
    contents: string;
    likes: number;
  }[];
}

export const appStateContext = createContext<AppState | null>(null);

export function useAppState() {
  const store = useAppStateStore();

  const [, forceUpdate] = useReducer((v) => v + 1, Number.MIN_SAFE_INTEGER);
  useEffect(() => {
    const unsubscribe = store.subscribe(forceUpdate);

    return unsubscribe;
  }, [store]);

  const appState = store.getState();

  return appState;
}
