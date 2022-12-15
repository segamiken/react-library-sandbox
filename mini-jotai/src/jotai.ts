import { useState, useEffect } from "react";

export const atom = (read: any, write?: any) => {
  if (typeof read === "function") {
    return { read, write };
  }
  const config = {
    init: read,

    // get in the read function is to read the atom value.
    // It's reactive and read dependencies are tracked.
    read: (get: any) => get(config),

    // get in the write function is also to read atom value, but it's not tracked.
    // set in the write function is to write atom value and
    // it will invoke the write function of the target atom.
    write:
      write ||
      ((get: any, set: any, arg: any) => {
        if (typeof arg === "function") {
          set(config, arg(get(config)));
        } else {
          set(config, arg);
        }
      }),
  };
  return config;
};

// we need to keep track of the state of the atom.
// we are using weakmap to avoid memory leaks
const atomStateMap = new WeakMap();

const getAtomState = (atom: any) => {
  let atomState = atomStateMap.get(atom);
  if (!atomState) {
    atomState = {
      value: atom.init,
      listeners: new Set(),
      dependents: new Set(),
    };
    atomStateMap.set(atom, atomState);
  }
  return atomState;
};

// If atom is primitive, we return it's value.
// If atom is derived, we read the parent atom's value
// and add current atom to parent's the dependent set (recursively).
const readAtom = (atom: any) => {
  const atomState = getAtomState(atom);
  const get = (a: any) => {
    if (a === atom) {
      return atomState.value;
    }
    const aState = getAtomState(a);
    aState.dependents.add(atom); // XXX add only
    return readAtom(a); // XXX no caching
  };
  const value = atom.read(get);
  atomState.value = value;
  return value;
};

// if atomState is modified, we need to notify all the dependent atoms (recursively)
// now run callbacks for all the components that are dependent on this atom
const notify = (atom: any) => {
  const atomState = getAtomState(atom);
  atomState.dependents.forEach((d: any) => {
    if (d !== atom) notify(d);
  });
  atomState.listeners.forEach((l: any) => l());
};

// writeAtom calls atom.write with the necessary params and triggers notify function
const writeAtom = (atom: any, value: any) => {
  const atomState = getAtomState(atom);

  // 'a' is some atom from atomStateMap
  const get = (a: any) => {
    const aState = getAtomState(a);
    return aState.value;
  };

  // if 'a' is the same as atom, update the value, notify that atom and return
  // else calls writeAtom for 'a' (recursively)
  const set = (a: any, v: any) => {
    if (a === atom) {
      atomState.value = v;
      notify(atom);
      return;
    }
    writeAtom(a, v);
  };

  atom.write(get, set, value);
};

export const useAtom = (atom: any) => {
  const [value, setValue] = useState();
  useEffect(() => {
    const callback = () => setValue(readAtom(atom));
    const atomState = getAtomState(atom);
    atomState.listeners.add(callback);
    callback();
    return () => atomState.listeners.delete(callback);
  }, [atom]);
  const setAtom = (nextValue: any) => {
    writeAtom(atom, nextValue);
  };
  return [value, setAtom];
};
