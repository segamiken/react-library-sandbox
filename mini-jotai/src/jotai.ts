import { useState, useEffect } from "react";

export const atom = (initialValue: string | number) => ({ init: initialValue });

const atomStateMap = new WeakMap();

const getAtomState = (atom: { init: string | number }) => {
  let atomState = atomStateMap.get(atom);
  if (!atomState) {
    atomState = { value: atom.init, listeners: new Set() };
    atomStateMap.set(atom, atomState);
  }
  return atomState;
};

export const useAtom = (atom: { init: string | number }) => {
  const atomState = getAtomState(atom);
  const [value, setValue] = useState(atomState.value);
  useEffect(() => {
    const callback = () => setValue(atomState.value);
    atomState.listeners.add(callback);
    callback();
    return () => atomState.listeners.delete(callback);
  }, [atomState]);
  const setAtom = (nextValue: string | number) => {
    atomState.value = nextValue;
    atomState.listeners.forEach((l: any) => l());
  };
  return [value, setAtom];
};
