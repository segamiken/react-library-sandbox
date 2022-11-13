import { createContext, useContext } from "react";

export interface AppState {
  articles: {
    id: string;
    contents: string;
    likes: number;
  }[];
}

export const appStateContext = createContext<AppState | null>(null);

export function useAppState() {
  const appState = useContext(appStateContext);
  if (!appState) {
    throw new Error("Provider で囲んでください");
  }

  return appState;
}
