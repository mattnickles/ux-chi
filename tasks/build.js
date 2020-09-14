import gulp from 'gulp';

gulp.task('build', gulp.series(
  'clean',
  'build:lux',
  'build:test',
  'build:website',
  'copy:lux:ce-scripts'
));
