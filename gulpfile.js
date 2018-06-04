const path = require('path');
const chalk = require('chalk');
const del = require('del');
const args = require('yargs').argv;

const gulp = require('gulp');
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const changed = require('gulp-changed');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const rename = require('gulp-rename');

const template = require('./build/template');

const env = process.env.NODE_ENV; // development, experience, production

gulp.task();
gulp.task();

gulp.task('copyFile', copyFiles);
gulp.task('buildCSS', buildCss);
gulp.task('buildJS', gulp.parallel(''));

gulp.task('clean', cleanTask);
gulp.task('build', gulp.parallel('buildCSS', 'buildJS', 'copyFile'));
gulp.task('watch', watchTask);

gulp.task('dev', gulp.series('clean', 'build', 'watch'));
gulp.task('pub', gulp.series('clean', 'build'));

gulp.task('add-page', addPageTask);
gulp.task('add-com', addComTask);


function addPageTask(cb) {
  const name = args.file.split('/')[0];
  const dest = `src/pages/${name}/`;
  template(name, dest);
  console.log(chalk.green(`已创建页面: ${dest}/${name}`));
  cb();
}

function addComTask(cb) {
  const name = args.file.split('/')[1] || args.file.split('/')[0];
  const dest = `src/components/${args.file.split('/')[0]}/`;
  template(name, dest);
  console.log(chalk.green(`已创建组件: ${dest}/${name}`));
  cb();

}

function cleanTask(cb) {
  del(['dist/**/*', '!dist/**/*.config.json']).then(() => cb());
}

function watchTask(cb) {
  const watcher = gulp.watch('src/**/*', gulp.parallel('buildCSS', 'buildJS', 'copyFile'));
  watcher.on('change', function (path, stats) {
    console.log(chalk.green('File ' + path + ' was changed'));
  });

  watcher.on('unlink', function (path) {
    console.log(chalk.red('File ' + path + ' was removed'));
  });

}

function copyFiles() {
  return gulp.src([
      'src/**/*.json',
      'src/**/*.wxml',
      'src/**/*.wxs',
    ])
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'))
}

function buildCss() {
  return gulp.src([
      'src/**/*.wxss',
    ])
    .pipe(less({
      paths: [ 'dist/assets/css' ]
    }))
    .pipe(rename(path => path.extname = '.wxss'))
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'))
}

function babelJs() {
  return gulp.src([
      'src/**/*js'
    ])
    .pipe(gulpIf('!src/utils/lib/*.js', babel()))
    .pipe(gulpIf(env === 'production', uglify()))
    .on('error', err => console.error(err.stack || err))
    .pipe(changed('./dist'))
    .pipe(gulp.dest('./dist'))
}

function handleAsyncAwait() {
  return gulp.src([
    'node_modules/regenerator-runtime/*.js'
  ])
  .pipe(gulpIf('!src/utils/lib/*.js', babel()))
  .pipe(gulpIf(env === 'production', uglify()))
  .on('error', err => console.error(err.stack || err))
  .pipe(changed('./dist/npm/regenerator-runtime'))
  .pipe(gulp.dest('./dist/npm/regenerator-runtime'))
}


