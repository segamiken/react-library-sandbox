import { AppState } from "./useAppState";
import { AppAction } from "./useDispatch";

export class AppStateStore {
  constructor(
    private reducer: (state: AppState, action: AppAction) => AppState,
    private appState: AppState
  ) {}

  getState = (): AppState => {
    return this.appState;
  };

  dispatch = (action: AppAction) => {
    this.appState = this.reducer(this.appState, action);
  };
}
