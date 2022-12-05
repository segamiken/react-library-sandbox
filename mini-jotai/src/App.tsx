import { atom, useAtom } from "./jotai";
import "./index.css";

const countAtom = atom(0);

const Counter = () => {
  const [count, setCount] = useAtom(countAtom);
  const inc = () => setCount(count + 1);
  return (
    <div>
      {count} <button onClick={inc}>+1</button>
    </div>
  );
};

const Counter2 = () => {
  const [count, setCount] = useAtom(countAtom);
  const inc = () => setCount(count + 1);
  return (
    <div>
      {count} <button onClick={inc}>+1</button>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Counter />
      <Counter2 />
    </div>
  );
}
