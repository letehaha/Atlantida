var gulp 				= require('gulp'),
		browserSync = require('browser-sync'),
		sass 				= require('gulp-sass'),
		cssnano 		= require('gulp-cssnano'),
		del 				= require('del'),
		autoprefixer= require('gulp-autoprefixer'),
		htmlmin 		= require('gulp-htmlmin'),
		ignore 			= require('gulp-ignore'),
		imagemin 		= require('gulp-imagemin'),
		spritesmith = require('gulp.spritesmith');

gulp.task('sass-main', function(){
	return gulp.src('app/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('sass-blog', function(){
	return gulp.src('app/blog/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/blog/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('sass-post', function(){
	return gulp.src('app/blog/post_with_sidebar/scss/main.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('app/blog/post_with_sidebar/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir : 'app'
		},
		notify: false
	})
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('app/img/icons/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.scss'
	}));
	return spriteData.pipe(gulp.dest('app/sprites/'));
});

gulp.task('watch', ['browser-sync', 'sass-main'], function(){
	gulp.watch('app/scss/**/*.scss', ['sass-main']);
	gulp.watch('app/jade/**/*.jade', ['jadeh']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/*.сss', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('dist'); // Delete folder dist before build
});

gulp.task('build', ["clean", "sass-main"], function() {

	var buildCss = gulp.src('app/css/**/*') // Dest css in production
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))

	var buildImage = gulp.src('app/img/**/*') // Dest img in production
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))

	var buildJs = gulp.src('app/js/**/*') // Dest js in production
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Dest HTML in production
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'));

});