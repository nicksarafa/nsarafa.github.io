import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import sourceMaps from 'gulp-sourcemaps'
import del from 'del'
import nano from 'gulp-cssnano'

const paths = {
  srcDir: 'src',
  allSrcCss: 'src/css/*.scss',
  allSrcJs: 'src/js/*.js',
  distDir: 'docs',
  allDistCss: 'docs/css/*.css',
  allDistJs: 'docs/js/*.js',
  gulpFile: 'gulpfile.babel.js',
}

gulp.task('clean', () => del(paths.distDir))
gulp.task('cleanCss', () => del(paths.allDistCss))
gulp.task('cleanJs', () => del(paths.allDistJs))

gulp.task('watch', () => {
  gulp.watch(paths.allSrcCss, ['css'])
  gulp.watch(paths.allSrcJs, ['js'])
})

gulp.task('js', ['cleanJs'], () => {
  return gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.distDir))
})

gulp.task('css', ['cleanCss'], () => {
  return gulp.src(paths.allSrcCss)
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(nano())
    .pipe(gulp.dest(paths.distDir))
})

gulp.task('build', ['clean', 'css', 'js'])

gulp.task('default', ['watch'])
