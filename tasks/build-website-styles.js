import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import sass from 'gulp-sass';
import { Folders } from './constants';
import {server} from './serve';
import * as lux from "../scripts/lux";


function buildWebsiteStyles () {
  const pipes = gulp.src(path.join('src/website/assets/styles', '**', '*.scss'))
    .pipe(plumber())
    .pipe(sass({
      includePaths: [
        path.join(Folders.ROOT, 'node_modules')
      ],
      outputStyle: 'compressed'
    })
      .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions', 'ie >= 10']
      }),
      cssnano({zindex: false})
    ]))
    .pipe(gulp.dest('dist/assets/styles'));

  if (server && server.active) {
    return pipes.pipe(server.stream()); //Updates css on the fly.
  } else {
    return pipes;
  }
}

buildWebsiteStyles.description = 'Builds Lux CSS library. Returns a stream.';

gulp.task('build:website:styles', buildWebsiteStyles);
