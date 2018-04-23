const gulp = require('gulp');

const config = require('../config');

gulp.task('watch', ['browserSync'], () => {
  gulp.watch(config.styles.src, ['styles']);
  // gulp.watch(config.images.src, ['images']);
  // gulp.watch(config.twig.watchSrc, ['twig']);
  gulp.watch(config.scripts.all, ['webpack:build-dev']);
});
