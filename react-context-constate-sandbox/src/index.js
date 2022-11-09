import React from "react";
import ReactDOM from "react-dom/client";
import DivideContext from "./DivideContext";
import OneContext from "./OneContext";
import OneContextWithReducer from "./OneContextWithReducer";

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
  </React.StrictMode>
);
