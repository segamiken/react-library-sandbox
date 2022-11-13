import React from "react";
import { useAppState } from "./useAppState";
import { useDispatch } from "./useDispatch";

export function Article({ id }: { id: string }) {
  console.info("rendering Article component");

  const article = useAppState((state) =>
    state.articles.find((a) => a.id === id)
  );
  const dispatch = useDispatch();

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
