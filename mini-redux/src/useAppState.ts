import { createContext } from "react";
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
  const appState = store.getState();

  return appState;
}
