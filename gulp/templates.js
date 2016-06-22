'use strict';

var gulp = require('gulp');
var del = require('del');
var templateCache = require('gulp-angular-templatecache');
var runSequence = require('run-sequence');

module.exports = function (options) {
    /**
     * Main
     *
     * Run 'angular-template-cache' and then delete /.tmp/views
     */
    gulp.task('angular-template', ['angular-template-cache'], function (cb) {
        del([options.tmp + '/views'], cb);
    });

    /**
     * Create elements.js from /views/elements/*
     */
    gulp.task('angular-template-cache-elements', function (cb) {
        return gulp.src(options.tmp + '/views/elements/**/*.html')
            .pipe(templateCache({
                root:     'views/elements/',
                filename: 'elements.js'
            }))
            .pipe(gulp.dest(options.tmp + '/js/modules/templates'));
    });

    /**
     * Create pages.js from /views/pages/*
     */
    gulp.task('angular-template-cache-pages', function (cb) {
        return gulp.src(options.tmp + '/views/pages/**/*.html')
            .pipe(templateCache({
                root:     'views/pages/',
                filename: 'pages.js'
            }))
            .pipe(gulp.dest(options.tmp + '/js/modules/templates'));
    });

    /**
     * Create modals.js from /views/modals/*
     */
    gulp.task('angular-template-cache-modals', function (cb) {
        return gulp.src(options.tmp + '/views/modals/**/*.html')
            .pipe(templateCache({
                root:     'views/modals/',
                filename: 'modals.js'
            }))
            .pipe(gulp.dest(options.tmp + '/js/modules/templates'));
    });

    /**
     * Run all templates task in parallel
     */
    gulp.task('angular-template-cache', function (cb) {
        runSequence(
            [
                'angular-template-cache-elements',
                'angular-template-cache-pages',
                'angular-template-cache-modals'
            ],
            cb
        );
    });
};
