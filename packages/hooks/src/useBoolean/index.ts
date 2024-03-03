import { useMemo, useState } from 'react';

// useToggle 切换
// true false
// 1.defaultValue
// 2.defaultValue reverseValue true false
// 3.defaultValue 'left' reverseValue 'right'

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

function useToggle<T = boolean>(): [boolean, Actions<T>]; // 作为最基础的true、 false的使用
function useToggle<T>(defaultValue: T): [T: Actions<T>];
function useToggle<D, R>(defaultValue: D, reverseValue: R): [D | R, Actions<D | R>];

function useToggle<D, R>(defaultValue: D = false as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);
  const actions = useMemo(() => {
    const reverseValueOrigin = reverseValue === undefined ? !defaultValue : (reverseValue as D | R);

    const toggle = () => setState((e) => (e === defaultValue ? reverseValueOrigin : defaultValue));

    const setLeft = () => setState(defaultValue);

    const setRight = () => setState(reverseValueOrigin);

    const set = (value: D | R) => setState(value);

    return {
      setLeft,
      setRight,
      set,
      toggle,
    };
  }, []);

  return [state, actions];
}

export default useToggle;
