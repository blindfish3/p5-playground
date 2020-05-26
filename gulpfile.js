const gulp = require("gulp");
const { series, parallel } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const del = require('del');
const browserSync = require('browser-sync').create();

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

gulp.task("default", series(clean, assets, scripts, serve, watchFiles));
