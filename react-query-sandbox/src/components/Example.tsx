import { useQuery } from "react-query";

export function Example() {
  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
      (res) => res.json()
    )
  );

  if (isLoading) return <>Loading...</>;

  if (error) return <>An error has occured: {(error as Error).message}</>;

  return (
    <div>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? "Updating..." : ""}</div>
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </div>
  );
}
