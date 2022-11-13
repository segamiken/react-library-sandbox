import { createContext, useCallback, useContext, useState } from "react";

// Context を、参照が変更する　count用 と 参照が変わらない increment 関数用の２つ作成する
const CountContext = createContext({});
const IncrementContext = createContext({});

// countと、increment を定義して返却するカスタムフックス
function useCounter({ initialCount = 0 } = {}) {
  const [count, setCount] = useState(initialCount);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  return { count, increment };
}

// ２つのプロバイダーをネストして１つのプロバイダーにする
const CounterProvider = ({ children, initialCount }) => {
  const { count, increment } = useCounter({ initialCount });
  return (
    <CountContext.Provider value={count}>
      <IncrementContext.Provider value={increment}>
        {children}
      </IncrementContext.Provider>
    </CountContext.Provider>
  );
};

const useCount = () => {
  return useContext(CountContext);
};

const useIncrement = () => {
  return useContext(IncrementContext);
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

function DivideContext() {
  return (
    <CounterProvider initialCount={1}>
      <Count />
      <IncrementButton />
    </CounterProvider>
  );
}

export default DivideContext;
