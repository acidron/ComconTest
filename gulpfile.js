//require('es6-promise').polyfill();
var gulp   = require('gulp'),
	jade   = require('gulp-jade'),
    concat = require('gulp-concat');

var browserSync = null;

gulp.task("js", function() {
	var stream = gulp.src(["bower_components/angularjs/angular.min.js", "bower_components/lodash/lodash.min.js", "source/js/*.js"])
		.pipe(concat('app.js'))
		.pipe(gulp.dest("build/"));
	return stream;
});

gulp.task('js-watch', ['js'], function() {
	browserSync.reload();
})

gulp.task("css", function() {
	var stream = gulp.src("bower_components/bootstrap-css/css/bootstrap.min.css")
		.pipe(concat('styles.css'))
		.pipe(gulp.dest("build/"));
	return stream;
});

gulp.task("sass", function() {
	var stream = gulp.src()
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gulp.dest("build/"));
	if (browserSync) {
		stream.pipe(browserSync.stream());
	}
	return stream;
});

gulp.task("html", function() {
	var stream = gulp.src("source/html/*.jade")
		.pipe(jade())
		.pipe(gulp.dest('build/'));
	return stream;
});

gulp.task('html-watch', ['html'], function() {
	browserSync.reload();
});

gulp.task("watch", ["js", "css", "html"], function() {
	browserSync = require('browser-sync').create();
    browserSync.init({
        open: false,
        notify: false,
        reload: true,
        proxy: '192.168.33.10/comcon'
    });
	gulp.watch("source/js/*.js", ["js-watch"]);
	gulp.watch("source/html/*.jade", ["html-watch"]);
});

gulp.task('default', [ "watch"]);
