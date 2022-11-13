import React from "react";
import { useAppState } from "./useAppState";

export function GlobalHeader() {
  console.info("rendering GlobalHeader component");

  const articles = useAppState((state) => state.articles);

  return (
    <header style={{ padding: 16 }}>
      総いいね: {articles.reduce((acc, { likes }) => acc + likes, 0)}
    </header>
  );
}
