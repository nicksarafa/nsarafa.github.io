import gulp from 'gulp'
import babel from 'gulp-babel'
import sass from 'gulp-sass'
import sourceMaps from 'gulp-sourcemaps'
import del from 'del'
import cssNano from 'gulp-cssnano'
import imagemin from 'gulp-imagemin'
import psi from 'psi'

/**
 * Measure site stats via Google PageSpeed Insights tool
 * For more options @see https://github.com/addyosmani/psi/blob/8a6af0a66a5c19fc0234f608ea14f0b0dd77575d/test/fixtures/response.json
 */

const site = 'https://nsarafa.github.io/'

gulp.task('psi-mobile', function () {
  return psi(site, {
    nokey: 'false',
    key: process.env.GOOGLE_API_KEY,
    strategy: 'mobile',
  }).then(function (data) {
    console.log('Mobile Speed score: ' + data.ruleGroups.SPEED.score)
    console.log('Mobile Usability score: ' + data.ruleGroups.USABILITY.score)
  })
})

gulp.task('psi-desktop', function () {
  return psi(site, {
    nokey: 'false',
    key: process.env.GOOGLE_API_KEY,
    strategy: 'desktop',
  }).then(function (data) {
    console.log('Desktop Speed score: ' + data.ruleGroups.SPEED.score)
  })
})

gulp.task('psi-page-stats', function () {
  return psi(site, {
    nokey: 'false',
    key: process.env.GOOGLE_API_KEY,
  }).then(function (data) {
      console.log('numberResources: ' + data.pageStats.numberResources)
      console.log('numberHosts: ' + data.pageStats.numberHosts)
      console.log('totalRequestBytes: ' + data.pageStats.totalRequestBytes)
      console.log('numberStaticResources: ' + data.pageStats.numberStaticResources)
      console.log('htmlResponseBytes: ' + data.pageStats.htmlResponseBytes)
      console.log('cssResponseBytes: ' + data.pageStats.cssResponseBytes)
      console.log('imageResponseBytes: ' + data.pageStats.imageResponseBytes)
      console.log('javascriptResponseBytes: ' + data.pageStats.javascriptResponseBytes)
      console.log('otherResponseBytes: ' + data.pageStats.otherResponseBytes)
      console.log('numberJsResources: ' + data.pageStats.numberJsResources)
      console.log('numberCssResources: ' + data.pageStats.numberCssResources)
      console.log('Desktop Speed score: ' + data.ruleGroups.SPEED.score)
  })
})

gulp.task('psi', ['psi-mobile', 'psi-desktop', 'psi-page-stats'])

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
