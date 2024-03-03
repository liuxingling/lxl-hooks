module.exports = {
  // 构建后的产物
  output: {
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  mode: 'production',
  resolve: {
    // 解析的文件
    extensions: ['.json', '.js'],
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.jsx?$/,
  //       use: {
  //         loader: 'babel-loader',
  //       },
  //     }
  //   ],
  // },
  // 不把react打包进去
  externals: [
    {
      react: 'React',
    },
  ],
};
