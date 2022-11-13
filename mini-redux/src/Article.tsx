import React from "react";
import { useAppState } from "./useAppState";
import { useDispatch } from "./useDispatch";

export function Article({ id }: { id: string }) {
  const { articles } = useAppState();
  const dispatch = useDispatch();

  const article = articles.find((a) => a.id === id);
  if (!article) {
    return <article>404</article>;
  }

  const { contents, likes } = article;

  return (
    <article style={{ border: "solid 1px gray", margin: 8, padding: 8 }}>
      <p>{contents}</p>

      <div>この記事のいいね: {likes}</div>

      <button
        onClick={() => {
          dispatch({
            type: "like",
            payload: {
              articleId: id,
            },
          });
        }}
      >
        いいねする
      </button>
    </article>
  );
}
