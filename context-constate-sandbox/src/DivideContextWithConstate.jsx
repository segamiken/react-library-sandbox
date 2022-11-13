import constate from "constate";
import { useCallback, useState } from "react";

// countと、increment を定義して返却するカスタムフックス
function useCounter({ initialCount = 0 } = {}) {
  const [count, setCount] = useState(initialCount);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  return { count, increment };
}

const [CounterProvider, useCount, useIncrement] = constate(
  useCounter,
  (value) => value.count,
  (value) => value.increment
);

// ボタンコンポーネント
function IncrementButton() {
  console.log("render IncrementButton");
  const increment = useIncrement();
  return <button onClick={increment}>+</button>;
}

// カウントコンポーネント
function Count() {
  console.log("render Count");
  const count = useCount();
  return <span>{count}</span>;
}

function DivideContextWithConstate() {
  return (
    <CounterProvider initialCount={1}>
      <Count />
      <IncrementButton />
    </CounterProvider>
  );
}

export default DivideContextWithConstate;
