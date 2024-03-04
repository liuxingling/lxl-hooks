const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

// 实现clean
gulp.task('clean', async () => {
  // del是异步的
  await del('dist');
  await del('es');
  await del('lib');
});

// 实现esm，将ts转为js的esnext, 再用babel转换为es5,最后生成es目录的产物
gulp.task('esm', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'ESNext',
  });
  // 获取当前代码的内容->tsconfig.pro.json的配置项
  return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});

// 实现cjs，使用esm的产物去生成
// 将js进行babel解析，之后进行打包
gulp.task('cjs', () => {
  return gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});

// 实现dts:类型声明文件 d.ts
gulp.task('declaraion', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true,
    emitDeclarationOnly: true, // 只声明最终打包的产物
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});

// 复制readme
// gulp.task('copyReadme', async () => {
//   await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
// });
gulp.task('copyReadme', () => {
  return gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});
// 将gulp的内容进行串联
exports.default = gulp.series('clean', 'esm', 'cjs', 'declaraion', 'copyReadme');
