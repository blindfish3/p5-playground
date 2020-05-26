const gulp = require('gulp');
const { series, parallel } = require('gulp');

const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cached');
const del = require('del');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');
const sourcemaps = require('gulp-sourcemaps');

const SRC = './src';
const DIST = './dist';

function reload(done) {
  browserSync.reload();
  done();
}

function clean() {
  return del([DIST + '/**']);
};


function assets() {
  return gulp.src([SRC + '/**/*',
            '!' + SRC + '/**/*.js',
    ])
    .pipe(cache('assets'))
    .pipe(gulp.dest(DIST));
};

function scripts() {
  return gulp.src('src/**/*.js')
    .pipe(cache('scripts'))
    .pipe(sourcemaps.init())
    .pipe(babel({
            presets: [
              ['@babel/preset-env',
              {
                'targets': {
                'esmodules' : true
              },
              'modules' : false
            }]]
        }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DIST));
};

function prettify() {
  return gulp.src('./src/**/*.js')
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest(SRC));
}

function lint() {
  return gulp.src('./src/**/*.js')
  .pipe(eslint({
    fix: true
  }))
  .pipe(eslint.format());
}

function serve(done) {
  browserSync.init({
      server: {
          baseDir: DIST,
          directory: true,
          serveStaticOptions: {
            extensions: ['html']
        }
      },
      ghostmode: {
          clicks: true,
          forms: true,
          scroll: true
      },
      open: false
  });
  gulp.watch(SRC + '/**/*.html', series(assets, reload));
  gulp.watch(SRC + '/**/*.css', series(assets, reload));
  gulp.watch(SRC + '/**/*.js', series(scripts, reload));
};

gulp.task('prettier', prettify);
gulp.task('lint', lint);
gulp.task('clean', clean);

gulp.task('default', series(clean, assets, scripts, serve));
