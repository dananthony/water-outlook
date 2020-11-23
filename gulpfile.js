const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');

gulp.task('styles', () => {
    return gulp.src('src/app.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssnano({
            safe: true,
            discardComments: {removeAll: true}
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', () => {
    return del([
        'dist/style.css',
    ]);
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.scss', (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});

gulp.task('default', gulp.series('watch'));

