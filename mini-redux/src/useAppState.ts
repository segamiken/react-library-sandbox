import { createContext, useEffect, useReducer, useRef } from "react";
import { useAppStateStore } from "./useAppStateStore";

export interface AppState {
  articles: {
    id: string;
    contents: string;
    likes: number;
  }[];
}

const firstCall = Symbol("firstCall");

export const appStateContext = createContext<AppState | null>(null);

/** React Redux の useSelector に対応するもの。selector 関数を引数として受け取る。 */
export function useAppState<T>(selector: (state: AppState) => T): T {
  const selector$ = useRef(selector);
  useEffect(() => {
    selector$.current = selector;
  });

  const slice$ = useRef<T | typeof firstCall>(firstCall);

  const store = useAppStateStore();

  const [, forceUpdate] = useReducer((v) => v + 1, Number.MIN_SAFE_INTEGER);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const freshSlice = selector$.current(store.getState());
      if (freshSlice === slice$.current) return;

      slice$.current = freshSlice;

      forceUpdate();
    });
    return unsubscribe;
  }, [store]);

  // 初回だけここで selector を呼ぶ。
  // 2 回目以降は subscribe したコールバック内で selector を呼んでいるので、呼ぶ必要がない。
  if (slice$.current === firstCall) {
    return selector(store.getState());
  }

  return slice$.current;
}
