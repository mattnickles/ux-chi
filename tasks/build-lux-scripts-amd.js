import gulp from 'gulp';
import path from 'path';
import vinylNamed from 'vinyl-named';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import plumber from 'gulp-plumber';
import webpackStream from 'webpack-stream';
import {Folders, WEBPACK_MODE} from './constants';

const sources = path.join(Folders.SRC, 'lux/javascript/index.js');
const destination = path.join(Folders.DIST, 'amd');
const copyright = `Lux and its documentation are released under the terms of the MIT license.
In addition, Lux uses several 3rd-party libraries,
a list of which can be viewed in the package.json file.
Please review each of their license and user agreements, as well.`;


const webpackConfig = {
  mode: WEBPACK_MODE,
  output: {
    library: 'lux',
    filename: 'lux.js',
    libraryTarget: 'amd'
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
  },
  externals: {
    'popper.js': 'popper',
    'dayjs': 'dayjs'
  }
};

if (process.env.PRODUCTION) {
  webpackConfig.plugins = [new UglifyJsPlugin({
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

function buildLuxScriptsAmd () {
  return gulp.src(sources)
    .pipe(plumber())
    .pipe(vinylNamed())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(destination));
}

buildLuxScriptsAmd.description = 'Compiles Lux JavaScript library into an ' +
  'AMD ES5 module. Returns a stream. ';

gulp.task('build:lux:scriptsAMD', buildLuxScriptsAmd);
