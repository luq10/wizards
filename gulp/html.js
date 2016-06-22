'use strict';

var gulp = require('gulp');

module.exports = function (options) {
    /**
     * Compile jade files to html files and save in /.tmp
     *
     * src:   /src
     * dest:  /.tmp
     */
    gulp.task('html', function () {
        return gulp.src(options.src + '/**/*.html')
            .pipe(gulp.dest(options.tmp));
    });
};
