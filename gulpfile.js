const gulp = require('gulp');
const { series, parallel } = require('gulp');

const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cached');
const del = require('del');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify-es').default;
const prettier = require('gulp-prettier');
const sourcemaps = require('gulp-sourcemaps');

const SRC = './src';
const DIST = './dist';
const BUILD = './build';

function isDevEnv() {
  return process.env.NODE_ENV !== 'production';
}

function getBuildTarget() {
  return isDevEnv() ? DIST : BUILD;
}

function reload(done) {
  browserSync.reload();
  done();
}

function clean() {
  return del([BUILD + '/**']);
};

function cleanDist() {
  return del([DIST + '/**']);
}

function assets() {
  return gulp.src([SRC + '/**/*',
            '!' + SRC + '/**/*.js',
            SRC + '/**/*.min.js',
    ])
    .pipe(cache('assets'))
    .pipe(gulp.dest(getBuildTarget()));
};

function scripts() {
  const dev = isDevEnv();
  return gulp.src([SRC + '/**/*.js',
                  '!' + SRC + '/**/*.min.js'])
    .pipe(cache('scripts'))
    .pipe(gulpif(!!dev, sourcemaps.init()))
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
    .pipe(gulpif(!dev, uglify()))
    .pipe(gulpif(!!dev, sourcemaps.write('.')))
    .pipe(gulp.dest(getBuildTarget()));
};

function prettify() {
  return gulp.src([SRC + '/**/*.js',
                  '!' + SRC + '/**/*.min.js'])
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
          baseDir: getBuildTarget(),
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
gulp.task('scripts', scripts);
gulp.task('clean', clean);
gulp.task('assets', assets);
gulp.task('cleanDist', cleanDist);
gulp.task('build', series(clean, assets, scripts));


gulp.task('default', series(clean, assets, scripts, serve));
