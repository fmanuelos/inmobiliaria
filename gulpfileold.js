var	gulp        = require('gulp'),
	browserSync = require('browser-sync'),
	del         = require('del'),
	$           = require('gulp-load-plugins')(),
	reload      = browserSync.reload;

gulp.task('serve', function() {
	browserSync({
		notify: false,
		open: false,
		ui: false,
		port: 9000,
		server: {
			baseDir: ['./src'],
		}
	});

	gulp.watch([
		'./src/*.html',
		'./src/scripts/**/*.js',
		'./src/styles/**/*.css',
		'./src/images/**/*',
		'./src/audios/**/*',
	]).on('change', reload);

   gulp.watch('bower.json', ['wiredep']);
});


gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['server/app.js']);

    // Restart the server when file changes
    //gulp.watch(['app/**/*.html'], server.notify);
    //gulp.watch(['app/styles/**/*.scss'], ['styles:scss']);
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], ['styles:css', server.notify]);
    //Event object won't pass down to gulp.watch's callback if there's more than one of them.
    //So the correct way to use server.notify is as following:
    //gulp.watch(['{.tmp,app}/styles/**/*.css'], function(event){
        //gulp.run('styles:css');
        //server.notify(event);
        //pipe support is added for server.notify since v0.1.5,
        //see https://github.com/gimm/gulp-express#servernotifyevent
    //});

    //gulp.watch(['app/scripts/**/*.js'], ['jshint']);
    //gulp.watch(['app/images/**/*'], server.notify);
    gulp.watch(['server/app.js', 'server/api/**/*.js'], [server.run]);
});

gulp.task('wiredep', function() {
	var wiredep = require('wiredep').stream;

	gulp.src('./src/*.html')
		.pipe(wiredep({}))
		.pipe(gulp.dest('./src'));
});

gulp.task('copy', function () {

  gulp.src(['./src/*.{ico,png,txt}', './src/images/*'], {base: './src'})
      .pipe(gulp.dest('./dist'));

	gulp.src('./src/bower_components/components-font-awesome/fonts/*')
		.pipe(gulp.dest('dist/fonts'));

});

gulp.task('clean', function () {
  del('./dist/');
});

gulp.task('useref', function () {
	var assets = $.useref.assets();

	gulp.src('./src/*.html')
		.pipe(assets)
		.pipe($.if('*.js', $.uglify()))
		.pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
		.pipe(gulp.dest('./dist'));
});

gulp.task('serve:dist', function () {
		browserSync({
			notify: false,
			ui: false,
			port: 9000,
			server: {
				baseDir: ['dist']
			}
	});
});

gulp.task('default', ['serve']);

gulp.task('build', ['copy', 'useref', 'serve:dist']);

