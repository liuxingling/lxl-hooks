/*
 * title: 基础用法
 * desc: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { useToggle } from 'lxlHooks';

export default () => {
  console.log('useToggle', useToggle());
  const [state, { toggle, setLeft, setRight, set }] = useToggle();
  console.log('value, act', state);
  return (
    <div>
      <p>Effects: {`${state}`}</p>
      <p>
        <button type="button" onClick={toggle}>
          Toggle
        </button>
        <button type="button" onClick={setLeft} style={{ marginLeft: 10 }}>
          Toggle false
        </button>
        <button type="button" onClick={setRight} style={{ marginLeft: 10 }}>
          Toggle true
        </button>
      </p>
    </div>
  );
};
