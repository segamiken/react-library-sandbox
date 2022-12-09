import "./index.css";
import create from "./zustand";

const useStore = create((set: any) => ({
  count: 0,
  inc: () => set((state: any) => ({ count: state.count + 1 })),
}));

const Counter = () => {
  const count = useStore((state: any) => state.count);
  const inc = useStore((state: any) => state.inc);
  return (
    <div>
      {count as string}
      <button onClick={inc as () => void}>+1</button>
    </div>
  );
};

const Counter2 = () => {
  const count = useStore((state: any) => state.count);
  const inc = useStore((state: any) => state.inc);
  return (
    <div>
      {count as string}
      <button onClick={inc as () => void}>+1</button>
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
