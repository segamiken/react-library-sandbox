import { AppState } from "./useAppState";
import { AppAction } from "./useDispatch";

/**
 * インスタンスに、appStat を保持させる。
 * App コンポーネント から useState を剥がし、再レンダリングを最適化するために誕生したクラス。
 * initialState と reducer関数を渡すことで、インスタンスを作成できる。
 */
export class AppStateStore {
  private listeners: (() => void)[] = [];

  constructor(
    private reducer: (state: AppState, action: AppAction) => AppState,
    private appState: AppState
  ) {}

  getState = (): AppState => {
    return this.appState;
  };

  dispatch = (action: AppAction) => {
    this.appState = this.reducer(this.appState, action);

    this.listeners.forEach((listener) => listener());
  };

  subscribe = (listener: () => void) => {
    this.listeners.push(listener);

    return () => {
      const index = this.listeners.lastIndexOf(listener);

      this.listeners.splice(index, 1);
    };
  };
}
