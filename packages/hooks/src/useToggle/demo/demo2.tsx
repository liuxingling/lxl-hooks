/**
 * title: 在任意两个值之间切换
 * desc: 接受两个可选参数，在它们之间进行切换。
 */
import React from 'react';
import { useToggle } from 'lxlHooks';

export default () => {
  console.log('useToggle', useToggle());
  const [state, { toggle, setLeft, setRight, set }] = useToggle('Hello', 'World');

  console.log('value, act', state);
  return (
    <div>
      <p>Effects: {`${state}`}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={() => set('Hello')} style={{ marginLeft: 10 }}>
          Set Hello
        </button>
        <button type="button" onClick={() => set('World')} style={{ marginLeft: 10 }}>
          Set World
        </button>
        <button type="button" onClick={setLeft} style={{ marginLeft: 10 }}>
          Set Left
        </button>
        <button type="button" onClick={setRight} style={{ marginLeft: 10 }}>
          Set Right
        </button>
      </p>
    </div>
  );
};
