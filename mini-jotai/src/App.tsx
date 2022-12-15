import { atom, useAtom } from "./jotai";
import "./index.css";

const countAtom = atom(0);
const doubleAtom = atom((get: any) => get(countAtom) * 2);

const Counter = () => {
  const [count, setCount] = useAtom(countAtom);
  const inc = () => setCount!((count as unknown as number) + 1);
  return (
    <>
      {count}
      <button onClick={inc}>+1</button>
    </>
  );
};

const DoubleCounter = () => {
  const [count] = useAtom(doubleAtom);
  return <>double: {count}</>;
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Counter />
      <DoubleCounter />
    </div>
  );
}
