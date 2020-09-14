import gulp from 'gulp';
import path from 'path';
import plumber from 'gulp-plumber';
import vinylNamed from 'vinyl-named';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { Folders, WEBPACK_MODE } from './constants';

const sources = path.join(Folders.SRC, 'lux/javascript/index.js');
const destination = path.join(Folders.DIST, 'js');
const copyright = `Lux and its documentation are released under the terms of the MIT license.
In addition, Lux uses several 3rd-party libraries,
a list of which can be viewed in the package.json file.
Please review each of their license and user agreements, as well.`;


const webpackConfig = {
  mode: WEBPACK_MODE,
  output: {
    library: 'lux',
    filename: 'lux.js',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

if (process.env.PRODUCTION) {
  webpackConfig.plugins = [new webpack.optimize.UglifyJsPlugin({
    comments: false,
    sourceMap: false,
    compress: {
      warnings: false,
      drop_console: false
    },
    exclude: [
      /node_modules\//
    ]
  }),
  new webpack.BannerPlugin(copyright)];
} else {
//  webpackConfig.devtool = 'eval';
  webpackConfig.plugins = [new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    append: null,
    module: true,
    columns: true,
    lineToLine: false,
    noSources: false,
    namespace: ''
  }),
  new webpack.BannerPlugin(copyright)];
}

function buildLuxScripts () {
  return gulp.src(sources)
    .pipe(plumber())
    .pipe(vinylNamed())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(destination));
}

buildLuxScripts.description = 'Compiles Lux JavaScript library into ES5. ';

gulp.task('build:lux:scripts', buildLuxScripts);
