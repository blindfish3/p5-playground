const gulp = require("gulp");
const { series, parallel } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const del = require('del');
const browserSync = require('browser-sync').create();
const prettier = require('gulp-prettier');
const eslint = require('gulp-eslint');

const reload = browserSync.reload;
const SRC = './src';
const DIST = './dist';

function clean() {
    return del([DIST + '/**']);
};


function assets() {
    return gulp.src([SRC + '/**/*',
            '!' + SRC + '/**/*.js',
        ])
        .pipe(gulp.dest(DIST))
        .pipe(browserSync.stream());
};

function scripts() {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
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
  .pipe(eslint.format())
}

function serve(done) {
  browserSync.init({
      server: {
          baseDir: DIST,
          directory: true
      },
      ghostmode: {
          clicks: true,
          forms: true,
          scroll: true
      }

  });
  done();
};

function watchFiles() {
  gulp.watch(SRC + "/**/*.html", series(assets, reload));
  gulp.watch(SRC + "/**/*.css", series(assets, reload));
  gulp.watch(SRC + "/**/*.js", series(scripts, reload));
}

gulp.task("prettier", prettify);
gulp.task("lint", lint);

gulp.task("default", series(clean, assets, scripts, serve, watchFiles));
