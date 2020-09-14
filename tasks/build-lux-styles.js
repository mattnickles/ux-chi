import gulp from 'gulp';
import * as lux from '../scripts/lux';
import {server} from './serve';

function buildLuxStyles(){
  if (server && server.active) {
    return lux.buildCss({ dest: 'dist' })
      .pipe(server.stream()); //Updates css on the fly.
  } else {
    return lux.buildCss({ dest: 'dist' });
  }
}

buildLuxStyles.description = "Builds Lux SCSS files into one minimized CSS file. ";
gulp.task('build:lux:styles', buildLuxStyles);
