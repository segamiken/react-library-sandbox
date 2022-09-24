import { useState, Dispatch, SetStateAction } from "react";
import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";

export function Example2() {
  const [postId, setPostId] = useState(-1);
  return (
    <>
      <h1>コンテンツを選んでください　{postId}</h1>
      {postId === -1 ? (
        <PostList setPostId={setPostId} />
      ) : (
        <Post postId={postId} setPostId={setPostId} />
      )}
    </>
  );
}

function PostList({
  setPostId,
}: {
  setPostId: Dispatch<SetStateAction<number>>;
}) {
  const { isLoading, isError, data, isSuccess } = usePosts();
  return (
    <div>
      <h2>Posts</h2>
      <div>
        {isLoading ? (
          "Loading..."
        ) : isError ? (
          "Errorr"
        ) : !isSuccess ? (
          "No Data"
        ) : (
          <div>
            {data.map((post) => (
              <p key={post.id}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" onClick={() => setPostId(post.id)}>
                  {post.title}
                </a>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Post({
  postId,
  setPostId,
}: {
  postId: number;
  setPostId: Dispatch<SetStateAction<number>>;
}) {
  const { data, isLoading, isSuccess } = usePost(postId);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : !isSuccess ? (
        "No Data"
      ) : (
        <div>
          <h2>{data.title}</h2>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" onClick={() => setPostId(-1)}>
            Back
          </a>
          <div>{data.body}</div>
        </div>
      )}
    </div>
  );
}

function usePost(
  postId: number
): UseQueryResult<{ title: string; id: number; body: string }> {
  return useQuery(["post", postId], async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return data;
  });
}

function usePosts(): UseQueryResult<{ title: string; id: number }[]> {
  return useQuery("posts", async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return data;
  });
}
