import { useAppStateStore } from "./useAppStateStore";

export type AppAction = {
  type: "like";
  payload: {
    articleId: string;
  };
};

export function useDispatch() {
  const store = useAppStateStore();

  return store.dispatch;
}
