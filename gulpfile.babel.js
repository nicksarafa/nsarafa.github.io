import 'babel-polyfill'

import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import sourceMaps from 'gulp-sourcemaps'
import del from 'del'

const paths = {
  allSrcJs: 'src/js/*.js',
  allSrcCss: 'src/css/*.css',
  distDir: 'docs',
  gulpFile: 'gulpfile.babel.js',
}

gulp.task('clean', () => del(paths.distDir))

gulp.task('watch', () => {
  gulp.watch(paths.allSrcCss, ['css'])
  gulp.watch(paths.allSrcJs, ['js'])
})

gulp.task('js', ['clean'], () => {
  return gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.distDir))
})

gulp.task('css', ['clean'], () => {
  return gulp.src(paths.allSrcCss)
    .pipe(sass())
    .pipe(gulp.dest(paths.distDir))
})

gulp.task('build', ['clean', 'css', 'js'])

gulp.task('default', ['watch'])
