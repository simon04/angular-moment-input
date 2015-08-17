/* eslint strict: 0, no-path-concat: 0 */
/* eslint-env node */
var gulp = require('gulp');
var karma = require('karma');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var header = require('gulp-header');
var rename = require('gulp-rename');
var del = require('del');
var uglify = require('gulp-uglify');

var config = {
  pkg: require('./package.json'),
  banner:
      '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n'
};

gulp.task('default', ['build', 'test']);
gulp.task('build', ['scripts']);
gulp.task('test', ['build', 'karma']);

gulp.task('watch', ['build', 'karma-watch'], function() {
  gulp.watch(['src/**/*.{js,html}'], ['build']);
});

gulp.task('clean', function(done) {
  del(['dist'], done);
});

gulp.task('scripts', ['clean', 'lint'], function() {
  return gulp.src(['src/**/*.js'])
    .pipe(concat('ngMomentInput.js'))
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(),
      pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('dist'));

});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js', '*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('karma', ['build'], function(done) {
  runTests(true, done);
});

gulp.task('karma-watch', ['build'], function(done) {
  runTests(false, done);
});

function runTests(singleRun, done) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: singleRun,
    autoWatch: !singleRun
  }, function() {
    done();
  }).start();
}
