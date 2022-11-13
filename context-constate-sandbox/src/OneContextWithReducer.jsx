import { createContext, useContext, useReducer } from "react";

// Contextの作成
const Context = createContext({});

// reducer の定義
function countReducer(state, action) {
  switch (action.type) {
    case "increment": {
      return state + 1;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

// reducer をラップするプロバイダ
const CounterProvider = ({ children, initialCount }) => {
  const [count, dispatch] = useReducer(countReducer, initialCount);
  return (
    <Context.Provider
      value={{
        count: count,
        dispatch: dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// プロバイダ から count を取り出す カスタムフックス
function useCount() {
  const value = useContext(Context);
  return value.count;
}

//
// プロバイダ から dispatch を取り出す カスタムフックス
const useDispatch = () => {
  const value = useContext(Context);
  return value.dispatch;
};

// ボタンコンポーネント
function IncrementButton() {
  console.log("render IncrementButton");
  const dispatch = useDispatch();
  return <button onClick={() => dispatch({ type: "increment" })}>+</button>;
}

// カウントコンポーネント
function Count() {
  console.log("render Count");
  const count = useCount();
  return <span>{count}</span>;
}

function OneContextWithReducer() {
  return (
    <CounterProvider initialCount={1}>
      <Count />
      <IncrementButton />
    </CounterProvider>
  );
}

export default OneContextWithReducer;
