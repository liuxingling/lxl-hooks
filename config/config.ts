import { menus } from './hooks';

// const packages = require('../packages/hooks/package.json');

export default {
  exportStatic: {},
  nodeModulesTransform: {
    // 设置 node_modules 目录下依赖文件的编译方式。
    type: 'none', // 不遍历node_modules中的文件
    exclude: [], // 忽略的依赖库，包名，暂不支持绝对路径
  },
  history: { type: 'hash' },
  extraBabelPlugins: [
    [
      'babel-plugin-import', // 按需加载用
      {
        libraryName: '@alifg/next',
        style: false,
      },
      'fusion',
    ],
  ],
  mode: 'site',
  title: '星爷 react hooks',
  favicon: '/avatar.png',
  logo: '/logo.png',
  dynamicImport: {},
  manifest: {},
  hash: true,
  alias: {
    // process.cwd()用于获取node.js流程的当前工作目录。
    lxlHooks: `${process.cwd()}/packages/hooks/src/index.ts`,
  },
  resolve: {
    includes: ['docs', 'packages/hooks/src'],
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/@alifd/theme-design-pro@0.6.2/dist/next-noreset.min.css',
    },
    { rel: 'stylesheet', href: '/style.css' },
  ],
  navs: [
    { title: '星爷指南', path: '/guide' },
    { title: '星爷Hooks', path: '/hooks' },
  ],
  menus: {
    '/': [{ title: '首页', path: 'index' }],
    '/guide': [{ title: '介绍', path: '/guide' }],
    '/hooks': menus,
  },
};
