import React, { useEffect, useReducer } from "react";
import { useAppState } from "./useAppState";
import { useAppStateStore } from "./useAppStateStore";

export function GlobalHeader() {
  console.info("rendering GlobalHeader component");

  const store = useAppStateStore();

  const [, forceUpdate] = useReducer((v) => v + 1, Number.MIN_SAFE_INTEGER);
  useEffect(() => {
    const unsubscribe = store.subscribe(forceUpdate);

    return unsubscribe;
  }, [store]);

  const { articles } = useAppState();

  return (
    <header style={{ padding: 16 }}>
      総いいね: {articles.reduce((acc, { likes }) => acc + likes, 0)}
    </header>
  );
}
