const path = require('path');
const { MiniCssExtractLoader } = require('mini-css-extract-plugin');

const ROOT_PATH = path.join(process.cwd());

module.exports.getApiURL = () => 'http://localhost:8080/graphql';

const app = {
  root: ROOT_PATH,
  src: path.join(ROOT_PATH, 'src'),
  styles: path.join(ROOT_PATH, 'src', 'styles'),
  dist: path.join(ROOT_PATH, 'dist'),
  target: path.join(ROOT_PATH, 'target'),
  nodeModules: path.join(ROOT_PATH, 'node_modules'),
};

module.exports.app = app;

module.exports.getRules = (isDev) => [
  {
    test: /\.tsx?$/,
    include: app.src,
    use: 'ts-loader',
  },
  {
    test: /\.s?css$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractLoader.loader,
      'css-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.(png|gif|jpe?g)$/,
    loader: 'file-loader',
    options: {
      esModule: false,
      outputPath: 'static/images',
    },
  },
  {
    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
    options: {
      esModule: false,
      outputPath: 'static/fonts',
    },
  },
];
