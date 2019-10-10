const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const mode = process.env.NODE_ENV.trim();

var config = {
  mode: mode,
  entry: {
    app: "./main.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].bundle.js",
    filename: mode == "production" ? "[name].[hash].js" : "[name].js"
  },
  plugins: [
    new webpack.ProgressPlugin({
      handler: (percentage, message, ...args) => {
        console.info(parseInt(percentage * 100), "%", ...args);
      }
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: true
    }),
    new webpack.ProvidePlugin({
      _: "lodash" // 全局配置lodash
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /(\.js|\.jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/transform-runtime",
              [
                "@babel/plugin-proposal-decorators",
                {
                  legacy: true
                }
              ],
              [
                "@babel/plugin-proposal-class-properties",
                {
                  loose: true
                }
              ],
              [
                "import",
                {
                  libraryName: "antd",
                  libraryDirectory: "lib",
                  style: "css"
                }
              ]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
};

if (mode == "development") {
  config.devtool = "cheap-module-eval-source-map";
  config.devServer = {
    contentBase: "./dist",
    inline: true,
    compress: true,
    disableHostCheck: true, // 关闭局域网之间不能访问的限制
    host: "0.0.0.0",
    useLocalIp: true,
    open: false, // 自动打开浏览器页面
    proxy: {
      "/xxx": {
        target: "http://xxx:xxx",
        pathRewrite: {
          "^/xxx": ""
        },
        changeOrigin: true,
        secure: false // 接受 运行在 https 上的服务
      }
    },
    port: 8080
  };
}
if (mode == "production") {
  config.devtool = "cheap-module-source-map";
  config.plugins.push(new CleanWebpackPlugin(["dist"]));
}

module.exports = config;
