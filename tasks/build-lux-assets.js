import gulp from 'gulp';
import * as lux from '../scripts/lux';

gulp.task('build:lux:assets', () => lux.copyAssets({ dest: 'dist' }));
