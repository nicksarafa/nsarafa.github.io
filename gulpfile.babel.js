import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import sourceMaps from 'gulp-sourcemaps'
import del from 'del'
import cssNano from 'gulp-cssnano'

const paths = {
  srcDir: 'src',
  allSrcStyles: 'src/styles/*.scss',
  allSrcScripts: 'src/scripts/*.js',
  distDir: 'docs',
  distScriptsDir: 'docs/scripts',
  distStylesDir: 'docs/styles',
  allDistStyles: 'docs/styles/*.css',
  allDistScripts: 'docs/scripts/*.js',
  gulpFile: 'gulpfile.babel.js',
}

gulp.task('clean', () => del(paths.distDir))
gulp.task('cleanStyles', () => del(paths.allDistStyles))
gulp.task('cleanScripts', () => del(paths.allDistScripts))

gulp.task('watch', () => {
  gulp.watch(paths.allSrcStyles, ['styles'])
  gulp.watch(paths.allSrcScripts, ['scripts'])
})

gulp.task('scripts', ['cleanScripts'], () => {
  return gulp.src(paths.allSrcScripts)
    .pipe(babel())
    .pipe(gulp.dest(paths.distScriptsDir))
})

gulp.task('styles', ['cleanStyles'], () => {
  return gulp.src(paths.allSrcStyles)
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(cssNano())
    .pipe(gulp.dest(paths.distStylesDir))
})

gulp.task('build', ['clean', 'styles', 'scripts'])

gulp.task('default', ['watch'])
