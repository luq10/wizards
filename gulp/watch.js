'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

function isOnlyChange(event) {
    return event.type === 'changed';
}

module.exports = function (options) {
    /**
     * Watch changes in files
     */
    gulp.task('watch', ['build:tmp'], function () {
        gulp.watch(options.src + '/**/*.html', function (event) {
            runSequence(
                ['html'],
                ['inject'],
                function () {
                    browserSync.reload(event.path);
                }
            );
        });

        gulp.watch([
            options.src + '/styles/**/*.scss',
            options.src + '/styles/**/*.css'
        ], function (event) {
            runSequence(
                ['styles'],
                function () {
                    browserSync.reload(event.path);
                }
            );
        });

        gulp.watch(options.src + '/js/**/*.js', function (event) {
            runSequence(
                ['scripts-copy'],
                function () {
                    browserSync.reload(event.path);
                }
            );
        });

        gulp.watch(options.src + '/views/**/*.html', function (event) {
            runSequence(
                ['html'],
                ['angular-template'],
                function () {
                    browserSync.reload(event.path);
                }
            );
        });
    });
};
