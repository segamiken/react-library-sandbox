import { useCallback } from "react";
import { RecoilRoot, atom, useSetRecoilState, useRecoilValue } from "recoil";

const counterState = atom({
  key: "counterState",
  default: 1,
});

// ボタンコンポーネント
function IncrementButton() {
  console.log("render IncrementButton");
  // useSetRecoilStateはAtomをsubscribeしない！
  const setCount = useSetRecoilState(counterState);
  const increment = useCallback(() => setCount((c) => c + 1), [setCount]);
  return <button onClick={increment}>+</button>;
}

// カウントコンポーネント
function Count() {
  console.log("render Count");
  const count = useRecoilValue(counterState);
  return <span>{count}</span>;
}

function RecoilCountApp() {
  return (
    <RecoilRoot>
      <Count />
      <IncrementButton />
    </RecoilRoot>
  );
}
export default RecoilCountApp;
