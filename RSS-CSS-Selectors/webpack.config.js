const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined; 

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    open: true,
    historyApiFallback: true,
  },
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'index.[contenthash].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new EslingPlugin({ extensions: 'ts' })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: devMode
          ? []
          : [
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  optipng: {
                    enabled: false,
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  webp: {
                    quality: 75,
                  },
                },
              },
            ],
        type: 'asset/resource',
      },
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.m?js$/i,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      "@element-creator": path.resolve(__dirname, "src/classes/util/element-creator/"),
      "@link-creator": path.resolve(__dirname, "src/classes/util/link-creator/"),
      "@state": path.resolve(__dirname, "src/classes/state/"),
      "@view": path.resolve(__dirname, "src/classes/view/"),
      "@header-view": path.resolve(__dirname, "src/classes/view/header/"),
      "@footer-view": path.resolve(__dirname, "src/classes/view/footer/"),
      "@main-view": path.resolve(__dirname, "src/classes/view/main/"),
      "@content-fields-view": path.resolve(__dirname, "src/classes/view/main/content-fields-view/"),
      "@number-line-view": path.resolve(__dirname, "src/classes/view/main/content-fields-view/numbers-line-view"),
      "@input-line-view": path.resolve(__dirname, "src/classes/view/main/css-view/input-line-view/"),
      "@css-view": path.resolve(__dirname, "src/classes/view/main/css-view/"),
      "@html-view": path.resolve(__dirname, "src/classes/view/main/html-view/"),
      "@table-view": path.resolve(__dirname, "src/classes/view/main/table/"),
      "@levels-data": path.resolve(__dirname, "src/data/"),
      "@custom-tags-view": path.resolve(__dirname, "src/classes/view/main/table/custom-tags/"),
      "@levels-view": path.resolve(__dirname, "src/classes/view/main/levels-view/"),
      "@app": path.resolve(__dirname, "src/classes/app/"),
    }
  }
}