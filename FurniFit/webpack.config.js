// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "public"),
    hot: true,
    open: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        // handle .js, .mjs, .jsx (TS later if you want)
        test: /\.m?jsx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Use ONLY these options (ignore any external babel config)
            babelrc: false,
            configFile: false,
            // Always parse as ESM so import/export in .js is allowed
            sourceType: "module",
            // Transform modern JS + JSX
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
            // Belt-and-braces: also enable JSX parser directly
            parserOpts: {
              sourceType: "module",
              plugins: ["jsx"],
            },
            cacheDirectory: false,
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
