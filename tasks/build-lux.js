import gulp from 'gulp';

gulp.task('build:lux', gulp.series(
  'lint:css:fix',
  'build:lux:styles',
  'build:lux:assets',
  'build:lux:sprite',
  'build:lux:scripts',
  'build:lux:scriptsES6',
  'build:lux:scriptsAMD',
  'build:test:fixtures'
));
