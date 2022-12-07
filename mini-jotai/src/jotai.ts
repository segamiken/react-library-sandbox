import { useState, useEffect } from "react";

// atom function returns a config object which contains initial value
export const atom = (initialValue: string | number) => ({ init: initialValue });

// we need to keep track of the state of the atom.
// we are using weakmap to avoid memory leaks
const atomStateMap = new WeakMap();

const getAtomState = (atom: { init: string | number }) => {
  let atomState = atomStateMap.get(atom);
  if (!atomState) {
    atomState = { value: atom.init, listeners: new Set() };
    atomStateMap.set(atom, atomState);
  }
  return atomState;
};

// useAtom hook returns a tuple of the current value
// and a function to update the atom's value
export const useAtom = (atom: { init: string | number }) => {
  // atomState is
  // {
  //   "value": 0,
  //   "listeners": {() => setValue(atomState.value)}
  // }
  const atomState = getAtomState(atom);

  const [value, setValue] = useState(atomState.value);
  useEffect(() => {
    const callback = () => setValue(atomState.value);

    // same atom can be used at multiple components, so we need to
    // keep listening for atom's state change till component is mounted.
    atomState.listeners.add(callback);
    callback();
    return () => atomState.listeners.delete(callback);
  }, [atomState]);

  // setAtom is
  // `nextValue => {
  //   atomState.value = nextValue;
  //   atomState.listeners.forEach(l => l());
  // }`
  const setAtom = (nextValue: string | number) => {
    atomState.value = nextValue;

    // let all the subscribed components know that the atom's state has changed
    atomState.listeners.forEach((l: () => void) => l());
  };

  return [value, setAtom];
};
