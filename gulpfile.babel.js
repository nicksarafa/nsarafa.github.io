import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import sourceMaps from 'gulp-sourcemaps'
import del from 'del'
import cssNano from 'gulp-cssnano'
import sassdoc from 'sassdoc'
import imagemin from 'gulp-imagemin'

const paths = {
  srcDir: 'src',
  allSrcStyles: 'src/styles/*.scss',
  allSrcScripts: 'src/scripts/*.js',
  docsDir: 'docs',
  docsScriptsDir: 'docs/scripts',
  docsStylesDir: 'docs/styles',
  allDistStyles: 'docs/styles/*.css',
  allDistScripts: 'docs/scripts/*.js',
  gulpFile: 'gulpfile.babel.js',
  allImages: 'src/images/*',
  docsImagesDir: 'docs/images',
}

gulp.task('clean', () => del(paths.docsDir))
gulp.task('cleanStyles', () => del(paths.allDistStyles))
gulp.task('cleanScripts', () => del(paths.allDistScripts))

gulp.task('watch', () => {
  gulp.watch(paths.allSrcStyles, ['styles'])
  gulp.watch(paths.allSrcScripts, ['scripts'])
})

gulp.task('scripts', ['cleanScripts'], () => {
  return gulp.src(paths.allSrcScripts)
    .pipe(babel())
    .pipe(gulp.dest(paths.docsScriptsDir))
})

gulp.task('styles', ['cleanStyles'], () => {
  return gulp.src(paths.allSrcStyles)
    .pipe(sourceMaps.init())
    .pipe(sassdoc())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMaps.write())
    .pipe(cssNano())
    .pipe(gulp.dest(paths.docsStylesDir))
})

gulp.task('images', () => {
  gulp.src(paths.allImages)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.docsImagesDir))
})

gulp.task('build', ['clean', 'styles', 'scripts'])

gulp.task('default', ['watch'])
