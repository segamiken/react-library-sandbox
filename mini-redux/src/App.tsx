import React from "react";
import { AppStateStore } from "./AppStateStore";
import { Article } from "./Article";
import { GlobalHeader } from "./GlobalHeader";
import { storeContext } from "./useAppStateStore";

const store = new AppStateStore(
  (state, action) => {
    switch (action.type) {
      case "like": {
        const { articleId } = action.payload;

        return {
          ...state,
          articles: state.articles.map((article) => {
            if (article.id !== articleId) {
              return article;
            }

            return {
              ...article,
              likes: article.likes + 1,
            };
          }),
        };
      }
    }

    return state;
  },
  {
    articles: [
      {
        id: "1",
        contents: "本来は API などから取得する記事の中身",
        likes: 0,
      },
      {
        id: "2",
        contents: "二つ目の記事",
        likes: 0,
      },
    ],
  }
);

export function App() {
  console.info("rendering App component");

  return (
    <storeContext.Provider value={store}>
      <GlobalHeader />

      <Article id="1" />

      <Article id="2" />
    </storeContext.Provider>
  );
}
