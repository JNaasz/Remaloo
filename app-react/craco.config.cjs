const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Include the 'common' directory in the module resolution
      webpackConfig.resolve.modules = [
        ...(webpackConfig.resolve.modules || []),
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../common/src'),
      ];

      // Add a rule to handle TypeScript files
      webpackConfig.module.rules.push({
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, '../common/src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      });

      return webpackConfig;
    },
  },
};
