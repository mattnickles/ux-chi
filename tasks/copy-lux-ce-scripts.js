import gulp from 'gulp';
import path from 'path';
import { Folders } from './constants';

const sources = path.join(Folders.SRC, 'custom-elements/dist/**/*');
const destination = path.join(Folders.DIST, 'js/ce');

function copyLuxCeScripts () {
  return gulp.src(sources)
    .pipe(gulp.dest(destination));
}

copyLuxCeScripts.description = 'Copies stencil Lux JavaScript library into dist/js/ce folder. ';

gulp.task('copy:lux:ce-scripts', copyLuxCeScripts);
