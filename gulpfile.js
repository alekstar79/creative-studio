const { src, dest, series, parallel, watch } = require('gulp')
const concat = require('gulp-concat')
const autoprefixes = require('gulp-autoprefixer')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const notify = require("gulp-notify")
const uglify = require('gulp-uglify-es').default
const svgmin = require('gulp-svgmin')
const sprite = require('gulp-svg-sprite')
const browserSync = require('browser-sync').create()
const pug = require('gulp-pug')

// const htmlMin = require('gulp-htmlmin')

const scripts = () => {
  return src (['src/js/**/*.js'])
    .pipe(uglify().on('error', notify.onError()))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(concat('script.js'))
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

const styles = () => {
  return src('src/css/**/*.css')
  .pipe(concat('styles.css'))
  .pipe(autoprefixes({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 1
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

const svg_sprite = () => {
  return src('src/svg/**/*.svg')
    .pipe(svgmin({
      /* plugins: [{
        removeComments: true
      },{
        removeEmptyContainers: true
      }] */
    }))
    .pipe(sprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist'))
}

const media = () => {
  return src('src/media/**/*.css')
  .pipe(concat('media.css'))
  .pipe(autoprefixes({
    cascade: false
  }))
  .pipe(cleanCSS({
    level: 1
  }))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

const ellipse_copy = () => {
  return src('src/svg/ellipse.svg').pipe(dest('dist/svg/'))
}

/* const sprite_copy = () => {
  return src('src/sprite.svg').pipe(dest('dist/'))
} */

const favicon_copy = () => {
  return src('src/favicon.svg').pipe(dest('dist/'))
}

const images_copy = () => {
  return src('src/img/**/*.*').pipe(dest('dist/img'))
}

const fonts_copy = () => {
  return src('src/fonts/*.*').pipe(dest('dist/fonts/'))
}

// const htmlMinify = () => {
//   return src('src/**/*.html')
//   .pipe(htmlMin({
//     collapseWhitespace: true,
//   }))
//   .pipe(dest('dist/'))
//   .pipe(browserSync.stream())
// }

const pugDev = () => {
  return src('./src/*.pug')
  .pipe (
    pug({
      // pretty: true
    })
  )
  .pipe(dest('dist/'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

// watch('src/**/*.html', htmlMinify)

watch('src/media/**/*.css', media)
watch('src/css/**/*.css', styles)
watch('src/js/**/*.js', scripts)
watch('src/*.pug', pugDev)

// exports.htmlMinify = htmlMinify

exports.scripts = scripts;
exports.styles = styles;
exports.media = media;
exports.pugDev = pugDev;
exports.favicon = favicon_copy;
exports.ellipse = ellipse_copy
exports.images = images_copy;
exports.sprite = svg_sprite;
exports.fonts = fonts_copy;

exports.build = parallel(scripts, styles, svg_sprite, images_copy, ellipse_copy, favicon_copy, fonts_copy, media, pugDev)

exports.default = series(scripts, styles, svg_sprite, images_copy, ellipse_copy, favicon_copy, fonts_copy, media, pugDev, watchFiles)
