import React, { createContext, useContext } from "react";

export type AppAction = {
  type: "like";
  payload: {
    articleId: string;
  };
};

export const dispatchContext = createContext<React.Dispatch<AppAction> | null>(
  null
);

export function useDispatch() {
  const dispatch = useContext(dispatchContext);
  if (!dispatch) {
    throw new Error("Provider で囲んでください");
  }

  return dispatch;
}
