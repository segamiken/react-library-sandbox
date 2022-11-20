import React from "react";
import ReactDOM from "react-dom/client";
import DivideContext from "./DivideContext";
import DivideContextWithConstate from "./DivideContextWithConstate";
import OneContext from "./OneContext";
import OneContextWithReducer from "./OneContextWithReducer";
import RecoilCountApp from "./Recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <h1>1つのContext</h1>
    <h2>
      useState（ボタンをクリックすると、2つのコンポーネントがレンダリングされる）
    </h2>
    <OneContext />
    <h2>
      useReducer（ボタンをクリックすると、2つのコンポーネントレンダリングされる）
    </h2>
    <OneContextWithReducer />
    <h1>複数のContextに分ける</h1>
    <h2>
      useState（ボタンをクリックすると、1つのコンポーネントのみレンダリングされる）
    </h2>
    <DivideContext />
    <h2>
      constateを使用（ボタンをクリックすると、1つのコンポーネントのみレンダリングされる）
    </h2>
    <DivideContextWithConstate />
    <h2>Recoilを使用</h2>
    <RecoilCountApp />
  </React.StrictMode>
);
