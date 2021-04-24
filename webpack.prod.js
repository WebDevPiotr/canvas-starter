const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.ts",
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: 'test',
    libraryTarget: 'umd',
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  }
};
