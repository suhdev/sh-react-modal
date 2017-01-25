var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    webpack = require('gulp-webpack'),
    cp = require('child_process'); 

gulp.task('sass',()=>{
    gulp.src('./sass/modal.scss')
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(rename('modal.min.css'))
        .pipe(gulp.dest('./dist'));
    gulp.src('./sass/modal.scss')
        .pipe(sass())
        .pipe(rename('modal.css'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js',()=>{
    let config = require('./webpack.config'); 
    gulp.src('./src/index.ts')
        .pipe(webpack(config))
        .pipe(rename('modal.js'))
        .pipe(gulp.dest('./dist/')); 
    cp.execSync('webpack --optimize-minimize'); 
    // return gulp.src('./src/index.ts')
    //     .pipe(webpack(config))
    //     .pipe(rename('modal.min.js'))
    //     .pipe(gulp.dest('./dist'));
});

gulp.task('default',['sass','js'],()=>{
    
});