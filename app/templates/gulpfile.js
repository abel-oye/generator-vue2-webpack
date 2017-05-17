import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';

const $ = gulpLoadPlugins();

import webpack from 'webpack';
import webpackConfig from './webpack.production.config';

const config = {
    srcDir: 'src/',//源文件目录
    distDir: 'dist/',//编译后产物目录
    tmpDir:'.tmp/',//临时目录
    testDir:'test/', //测试目录
    prefix:'/',
    staticServe:{
        port:9000
    }
}


gulp.task('html', () => {
    const assets = $.useref.assets({
        searchPath: [config.tmpDir],
        transformPath(filePath){
            return filePath
        }
    });

    return gulp.src(['views/*.html'])
        .pipe(assets)
        .pipe($.rev())
        .pipe(gulp.dest(config.distDir))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace({
            prefix:config.prefix
        }))
        .pipe($.filter('*.html'))
        .pipe(gulp.dest('views'));
});

gulp.task('webpack',(callback)=>{
    webpack(
      webpackConfig
    , function(err, status) {
      if(err){
        console.log('webpack ERR: '+err)
      }
      callback && callback()
    });
});

gulp.task('copy:html',()=>{
   return gulp.src(`${config.distDir}/src/views/*.html`)
    .pipe(gulp.dest('views'));
});

gulp.task('clean:pre', del.bind(null, [
    config.tmpDir,
    config.distDir,
    'views'
]));

gulp.task('build', [/*'clean:pre',*/ 'webpack'],()=>{
    gulp.start('copy:html');
});
