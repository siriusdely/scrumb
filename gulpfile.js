'use strict';

// Credits to https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var babelify = require('babelify');
var browserifycss = require('browserify-css');
var cssify = require('cssify');

// add custom browserify options here
var customOpts = {
  entries: ['./scrumb/src/index.js'],
  transform: [
    [babelify, {
      presets: ["es2015", "react"]
    }],
    [cssify, {
      global: true
    }],
    [browserifycss]
  ], // We want to convert JSX to normal javascript and es6 to es5
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', log.info); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', log.error.bind(log, 'Browserify Error'))
    .pipe(source('scrumb-bundle.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./app/assets/javascripts'));
}

gulp.task('default', ['js']);
