import gulp from 'gulp';
import * as lux from '../scripts/lux';

gulp.task('build:lux:sprite', () => lux.buildSprite({ dest: 'dist' }));
