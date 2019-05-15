const path = require("path");
const webpack = require("webpack");
const TSLintPlugin = require("tslint-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: [
    './src/index.ts',
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|otf|ttf|eot)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false',
        ],
      },
    ]
  },
  optimization: {
    minimize: false,
    // namedModules: true,
    // namedChunks: true,
    // usedExports: true,

    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
    // runtimeChunk: true,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: [".tsx", ".ts", ".js", "jsx"],
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, "lib"),
    // publicPath: "/",
    filename: 'index.js'
    // filename: 'index.js',
    // chunkFilename: '[name].[chunkhash].chunk.js',
    // path: path.resolve(__dirname, "lib"),
    // filename: 'index.js',
    // chunkFilename: '[name].[chunkhash].chunk.js',
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module
    new TSLintPlugin({
      files: ["./src/**/*.ts", "./src/**/*.tsx"]
    }),
  ],
  devtool: "inline-source-map",
  target: 'web',
};
