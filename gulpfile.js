var gulp      = require('gulp'),
    server    = require('gulp-express'),
    inject    = require('gulp-inject');

gulp.task('server', function () {
  // Start the server at the beginning of the task
  server.run(['--debug','./server/app.js']);

  // Restart the server when file changes
  gulp.watch([
    './client/{app,components}/**/*.html',
    './client/{app,components}/**/*.js',
    './client/{app,components}/**/*.css',
    './client/assets/images/**/*'
  ], server.notify);

  gulp.watch('./bower.json', ['wiredep']);

  gulp.watch(['./server/app.js', './server/api/**/*.js'], [server.run]);
});

// Automatically inject files into the app
gulp.task('inject', function () {

  var sources = gulp.src([
    './client/{app,components}/**/*.js',
    './client/{app,components}/**/*.css',
    '!./client/{app,components}/**/*.spec.js',
    '!./client/{app,components}/**/*.mock.js',
    '!./client/app/app.js',
    '!./client/app/app.css',
    '!./client/app/account/login/login.body.css'], {read: false});

  return gulp.src('./client/index.html')
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./client'));
});

// Automatically inject Bower components into the app
gulp.task('wiredep', function() {
  var wiredep = require('wiredep').stream;

  gulp.src('./client/index.html')
    .pipe(wiredep({
      exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/']
    }))
    .pipe(gulp.dest('./client'));
});

gulp.task('default', ['server']);
