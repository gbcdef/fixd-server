const gulp = require('gulp')
const stylus = require('gulp-stylus')
const nodemon = require('gulp-nodemon')
const plumber = require('gulp-plumber')
const autoprefixer = require('gulp-autoprefixer')

const config = {
  stylus: {
    src: './src/stylus/*',
    dest: './src/vendor',
  },
}

gulp.task('watch', function(){
	gulp.watch(config.stylus.src, ['stylus'])
})

gulp.task('stylus', function(){
	gulp.src(config.stylus.src)
  .pipe(plumber())
	.pipe(stylus())
  .pipe(autoprefixer())
	.pipe(gulp.dest(config.stylus.dest))
})

gulp.task('nodemon', function () {
  nodemon({
    script: './src/index.js',
  	ext: 'js css pug',
  	env: { 'NODE_ENV': 'development' },
  	ignore: ['gulpfile.js']
  })
})

gulp.task('start',function(){
	gulp.start('watch', 'stylus', 'nodemon')
})
