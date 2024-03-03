const commonConfig = require('../../gulpfile');
const gulp = require('gulp');
const fs = require('fs');
const fse = require('fs-extra'); // 额外扩展的fs能力
const fg = require('fast-glob'); // 提供快速扫描文件的功能
const gm = require('gray-matter'); // 对md的内容进行产出

function generateDesc(mdPath) {
  // 如果文件存在
  if (!fs.existsSync(mdPath)) {
    return;
  }
  const mdFile = fs.readFileSync(mdPath, 'utf-8');
  const { content } = gm(mdFile);
  // 通过正则拿到对应描述
  const description =
    (content.replace(/\r\n/g, '\n').match(/# \w+[\s\n]+(.+?)(?:, |\. |\n|\.\n)/m) || [])[1] || '';
  console.log('result--->', description);
  return description;
}

// 获取hooks/src/**/index.md的描述 */
async function generateMetaData() {
  const metaData = {
    functions: [],
  };
  const hooks = fg
    .sync('src/use*', {
      onlyDirectories: true,
    })
    .map((hook) => hook.replace('src/', ''));
  console.log('hooks--->', hooks);
  await Promise.allSettled(
    hooks.map(async (hook) => {
      const description = await generateDesc(`src/${hook}/index.md`);
      return {
        name: hook,
        description,
      };
    }),
  ).then((res) => {
    metaData.functions = res.map((item) => {
      if (item.status === 'fulfilled') {
        return item.value;
      }
    });
    return null;
  });
  return metaData;
}

// 用于生成metadata
gulp.task('metaData', async () => {
  const metaData = await generateMetaData();
  await fse.writeJSON('metaData.json', metaData, {
    spaces: 2, // 格式化
  });
});

// 将gulp的内容进行串联
exports.default = gulp.series(commonConfig.default, 'metaData');
