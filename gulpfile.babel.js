import gulp from 'gulp';

const requires = {
  'clean': require('./tasks/clean.js'),
  'serve': require('./tasks/serve.js'),
  'lint-css-fix': require('./tasks/lint-fix'),
  'build-lux-styles': require('./tasks/build-lux-styles.js'),
  'build-lux-assets': require('./tasks/build-lux-assets.js'),
  'build-lux-sprite': require('./tasks/build-lux-sprite.js'),
  'build-lux-scripts-amd': require('./tasks/build-lux-scripts-amd.js'),
  'build-lux-scripts-es6': require('./tasks/build-lux-scripts-es6.js'),
  'build-lux-scripts': require('./tasks/build-lux-scripts.js'),
  'build-test-fixtures': require('./tasks/build-test-fixtures.js'),
  'build-lux': require('./tasks/build-lux.js'),
  'build-test-styles': require('./tasks/build-test-styles.js'),
  'build-test': require('./tasks/build-test.js'),
  'build-website-images': require('./tasks/build-website-images.js'),
  'build-website-scripts': require('./tasks/build-website-scripts.js'),
  'build-website-styles': require('./tasks/build-website-styles.js'),
  'build-website-views': require('./tasks/build-website-views.js'),
  'build-website': require('./tasks/build-website.js'),
  'copy-lux-ce-scripts': require('./tasks/copy-lux-ce-scripts'),
  'build': require('./tasks/build.js'),
  'backstop': require('./tasks/backstop.js'),
  'ci': require('./tasks/ci.js'),
  'constants': require('./tasks/constants.js'),
  'lint-css': require('./tasks/lint-css.js'),
  'test': require('./tasks/test.js'),
  'watch': require('./tasks/watch.js'),
  'stencil-start': require('./tasks/start-stencil.js'),
  'custom-elements-watch': require('./tasks/watch-custom-elements.js'),
  'lint-typescript': require('./tasks/lint-typescript'),
  'test-custom-elements': require('./tasks/test-custom-elements'),
  'test-e2e': require('./tasks/test-e2e')
};

gulp.task('default', function(){});
