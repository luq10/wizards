'use strict';

var gulp = require('gulp');

module.exports = function (options) {
    /**
     * Copy /svg folder
     *
     * src:   /src
     * dest:  /.tmp
     */
    gulp.task('svg', function () {
        return gulp.src(options.src + '/svg/**/*')
            .pipe(gulp.dest(options.tmp + '/svg'));
    });

    gulp.task('assets', function () {
        return gulp.src(options.src + '/assets/**/*')
            .pipe(gulp.dest(options.tmp + '/assets'));
    });
};
