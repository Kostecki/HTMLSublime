var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync');

//Set working directories

var config = {
    assets: './assets', 
}

//Set working environment - development or production
var env = 'development';

// SASS tasks
gulp.task('sass', function() {
    return gulp.src(config.assets + '/scss/*.scss')
        .pipe(gulpif(env === 'development', sass({errLogToConsole: true})))
        .pipe(gulpif(env === 'production', sass({errLogToConsole: true})))
        .pipe(gulpif(env === 'production', minifycss()))
        .pipe(gulp.dest(config.assets + '/css'))
        .pipe(notify({
            message: 'Successfully compiled SCSS'
        }));
});

// JS tasks
gulp.task('js', function() {
    return gulp.src(config.assets + '/js/working-files/*.js') //
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(concat('script.js'))
        .pipe(gulp.dest(config.assets + '/js'))
        .pipe(notify({
            message: 'Successfully compiled JS'
        }));
});

//Browser-sync
gulp.task('browser-sync', function() {
    browserSync({
        server: "./",
        files: ["*.html", (config.assets + "/css/*.css"), (config.assets + "/js/*.js")]
    });
});

// Watch
gulp.task('watch', function() {
        // Watch .scss files
        gulp.watch(config.assets + '/scss/**/*.scss', ['sass']);
        gulp.watch(config.assets + '/bower_components/**/*.scss', ['sass']);

        // Watch .js files
        gulp.watch(config.assets + '/js/working-files/*.js', ['js']);
});

// Default task
gulp.task('default', ['sass', 'js', 'browser-sync', 'watch'], function() {

});