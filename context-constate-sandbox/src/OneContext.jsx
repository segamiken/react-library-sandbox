import { createContext, useCallback, useContext, useState } from "react";

// Contextの作成
const Context = createContext({});

// countと、increment を定義して返却するカスタムフックス
function useCounter({ initialCount = 0 } = {}) {
  const [count, setCount] = useState(initialCount);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  return { count, increment };
}

// カスタムフック を ラップ する プロバイダ
const CounterProvider = ({ children, initialCount }) => {
  const value = useCounter({ initialCount });
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

// プロバイダ から count を取り出す カスタムフックス
const useCount = () => {
  const value = useContext(Context);
  return value.count;
};

// プロバイダ から increment を取り出す カスタムフックス
const useIncrement = () => {
  const value = useContext(Context);
  return value.increment;
};

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

function OneContext() {
  return (
    <CounterProvider initialCount={1}>
      <Count />
      <IncrementButton />
    </CounterProvider>
  );
}

export default OneContext;
