import { useAppStateStore } from "./useAppStateStore";

export type AppAction = {
  type: "like";
  payload: {
    articleId: string;
  };
};

/** React Redux の useDispatch に対応するもの。 */
export function useDispatch() {
  const store = useAppStateStore();

  return store.dispatch;
}
