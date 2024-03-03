import * as lxlHooks from '..';

// 断言
describe('lxlHooks', () => {
  test('导出的hooks都是可以用的', () => {
    Object.keys(lxlHooks).forEach((module) => {
      expect(lxlHooks[module]).toBeDefined(); // 判断lxlHooks的所有模块是否被定义
    });
  });
});
