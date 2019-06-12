var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');
var runSequence = require('run-sequence');
var typescript = require("gulp-typescript");
var fs = require("fs");

var bundleConfig = JSON.parse(fs.readFileSync(`./configurations/bundles.json`).toString());

gulp.task('sass', () => {
    return gulp.src(bundleConfig.cssBundles)
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
})

gulp.task('js', function () {
    var tsProject = typescript.createProject({});

    return gulp.src(bundleConfig.jsBundles)
        .pipe(tsProject())
        .pipe(gulp.dest('build/js'));
});

gulp.task('transpile', () => {
    return gulp.src("./build/js/*.js")
        .pipe(babel({
            presets: ['babel-preset-es2015']
        }))
        .pipe(gulp.dest('./build/js'))
});

gulp.task('browserify', () => {
    return gulp.src("./build/js/*.js")
        .pipe(browserify())
        .pipe(gulp.dest('./build/js'))
});

gulp.task('build', () => {
    runSequence('sass', 'js', 'transpile', 'browserify');
});


gulp.task('watch', () => {
    gulp.watch(bundleConfig.jsBundles, ['build']);
});


// gulp.task('default', ['build']);



// gulp.task('js', () => {
//     return gulp.src(tsConfig)
//         .pipe(minify())
//         .pipe(useTsConfig.build());// generates .js and optionaly .map anod/or .d.ts files
// });

// gulp.task('watch', ['build'], () => {
//     gulp.watch('./src/*.ts', ['js']);
//     gulp.watch('./styles/*.scss', ['sass']);
// });

// gulp.task('build', ['js', 'sass']);