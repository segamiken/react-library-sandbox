import React, { useReducer } from "react";
import { Article } from "./Article";
import { GlobalHeader } from "./GlobalHeader";
import { AppState, appStateContext } from "./useAppState";
import { AppAction, dispatchContext } from "./useDispatch";

export function App() {
  const [appState, dispatch] = useReducer(
    (state: AppState, action: AppAction) => {
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

  return (
    <dispatchContext.Provider value={dispatch}>
      <appStateContext.Provider value={appState}>
        <GlobalHeader />

        <Article id="1" />

        <Article id="2" />
      </appStateContext.Provider>
    </dispatchContext.Provider>
  );
}
