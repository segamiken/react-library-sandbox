import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";

export const createStore = (createState: any) => {
  let state: any;
  const listeners = new Set();
  const setState = (partial: unknown, replace: unknown) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace !== null ? replace : typeof nextState !== "object")
        ? nextState
        : Object.assign({}, state, nextState);
      listeners.forEach((listener: any) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const subscribe = (listener: any) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destory = () => listeners.clear();
  const api = { setState, getState, subscribe, destory };
  state = createState(setState, getState, api);
  return api;
};

export const useStore = (api: any, selector = api.getState, equalityFn: any) =>
  useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getState,
    selector,
    equalityFn
  );

const create = (createState: unknown) => {
  const api =
    typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector: any, equalityFn?: any) =>
    useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export default create;
