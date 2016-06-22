'use strict';

var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');

module.exports = function (options) {
    /**
     * Compile main scss file (styles.scss) to css file
     *
     * src:   /src
     * dest:  /.tmp
     */
    gulp.task('styles', function () {
        return gulp.src(options.src + '/styles/styles.scss')
            .pipe(rubySass({style: 'expanded'})).on('error', options.errorHandler('RubySass'))
            .pipe(gulp.dest(options.tmp + '/styles'));
    });
};

