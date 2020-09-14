import gulp from 'gulp';
import { Folders } from './constants';
import path from "path";

const sources = path.join(Folders.SRC, 'lux/javascript/**/*.js');
const destination = path.join(Folders.DIST, 'es6');

gulp.task('build:lux:scriptsES6', () =>
  gulp.src(sources)
    .pipe(gulp.dest(destination))
);
