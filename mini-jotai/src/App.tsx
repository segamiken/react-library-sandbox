import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const inc = () => setCount(count + 1);
  return (
    <div>
      {count} <button onClick={inc}>+1</button>
    </div>
  );
};

const Counter2 = () => {
  const [count, setCount] = useState(0);
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
