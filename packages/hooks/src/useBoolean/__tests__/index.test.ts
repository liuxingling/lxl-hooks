// 如果要测试hooks
import { renderHook, act } from '@testing-library/react';
import useToggle from '../index';

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

describe('useToggle', () => {
  it('测试初始化没值的时候是否为false', () => {
    const hook = renderHook(() => useToggle());
    console.log('hook', hook);
    expect(hook.result.current[0]).toBeFalsy();
  });
  it('测试两个值，hello world', () => {
    const hook = renderHook(() => useToggle('hello', 'world'));
    callToggle(hook);
    expect(hook.result.current[0]).toBe('world');
    act(() => {
      hook.result.current[1].set('hello');
    });
    expect(hook.result.current[0]).toBe('hello');
    callToggle(hook);
    expect(hook.result.current[0]).toBe('world');
  });
  it('测试调用方法', () => {
    const hook = renderHook(() => useToggle('hello'));
    console.log('hook-->', hook.result.current[0]);

    expect(hook.result.current[0]).toBe('hello');
    callToggle(hook);
    expect(hook.result.current[0]).toBeFalsy();
    console.log('hook.result.current-->', hook.result.current);
    console.log('hook.result.current[0]-->', hook.result.current[0]);
    console.log('hook.result.current[1]-->', hook.result.current[1]);

    // act(() => {
    //   hook.result.current[1].setLeft();
    // });
  });
});
