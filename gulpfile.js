var CNAME = 'christo8989-dev.surge.sh';
var path = {
    prod: './prod',
    dev: './dev',
    src: './src',
    tmp: './tmp',
    scripts: '/scripts',
    styles: '/styles',
    views: '/views',
    images: '/media',
    
    jquery: './node_modules/jquery/dist/jquery.min.js',
    normalizecss: './node_modules/normalize.css/normalize.css',
    //fontawesome: './node_modules/node-font-awesome/node_modules/font-awesome',
};
path.sscripts = path.src +  path.scripts;
path.sstyles = path.src + path.styles;
path.sviews = path.src + path.views;
path.simages = path.src + path.images;
//path.fonts = path.fontawesome + '/fonts/*';

//https://www.npmjs.com/package/gulp-iconfont-css
//https://www.npmjs.com/package/gulp-iconfont

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    jade = require('gulp-jade'),
    cssmin = require('gulp-cssnano'),
    jsmin = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    //icon = require('gulp-iconfont'),
    clean = require('gulp-rimraf'),
    run = require('run-sequence'),
    surge = require('gulp-surge'),
    //rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    //fontawesome = require('node-font-awesome'),
    //iconcss = require('gulp-iconfont-css'),
    //source = require('vinyl-source-stream'),
    //browserify = require('browserify');
    pngquant = require('imagemin-pngquant');
    


/* VIEWS */
var views = 'views';
gulp.task(views, function() {
    var YOUR_LOCALS = {};
    return gulp.src(path.sviews + '/*.jade')
    .pipe(jade({
        locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(path.prod));
});
/* VIEWS END */



/* JAVASCRIPT */
var dscripts = 'dev-scripts',
    pscripts = 'prod-scripts';
gulp.task(dscripts, function() {
    return gulp.src([path.jquery, path.sscripts + '/main.js', path.sscripts + '/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(path.dev));
});

gulp.task(pscripts, function() {
    return gulp.src([path.jquery, path.sscripts + '/*.js'])
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(concat('app.js'))
    .pipe(jsmin())
    .pipe(gulp.dest(path.prod));
});



var dbootstrapjs = 'dbootstrapjs',
    pbootstrapjs = 'pbootstrapjs';
gulp.task(dbootstrapjs, function () {
    return gulp.src(path.sscripts + '/bootstrap/*.js')
    .pipe(gulp.dest(path.dev));
});
gulp.task(pbootstrapjs, function () {
    return gulp.src(path.sscripts + '/bootstrap/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest(path.prod));
});
/* JAVASCRIPT END */


/* CSS */
var dstyles = 'dev-styles',
    pstyles = 'prod-styles';
gulp.task(dstyles, function() {
    return gulp.src([path.normalizecss, path.sstyles + '/*.scss'])
    .pipe(sass(
        //{
      //includePaths: [fontawesome.scssPath]
   //}
    ).on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(path.dev));
    
    // return gulp.src(['./node_modules/normalize.css/normalize.css', './DEV/css/*.css'])
    // .pipe(concat('app.min.css'))
    // .pipe(cssmin())
    // //.pipe(rename({suffix:'.min'}))
    // .pipe(gulp.dest('./PROD/'));
});

gulp.task(pstyles, function() {
    return gulp.src(path.sstyles + '/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod));
});


// var fonts = 'fonts';
// gulp.task(fonts, function () {
//     return gulp.src(path.fonts)
//     .pipe(gulp.dest(path.dev + '/fonts'));
// });

var dbootstrapcss = 'dbootstrapcss',
    pbootstrapcss = 'pbootstrapcss';
gulp.task(dbootstrapcss, function () {
    return gulp.src(path.sstyles + '/bootstrap/*.css')
    .pipe(gulp.dest(path.dev));
});
gulp.task(pbootstrapcss, function () {
    return gulp.src(path.sstyles + '/bootstrap/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(path.prod));
});
/* CSS END */


/* IMAGES */
var images = 'images';
gulp.task(images, function() {
    return gulp.src(path.simages + '/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(path.prod));
});





/* CLEAN */
var dclean = 'dev-clean',
    pclean = 'prod-clean';
gulp.task('clean', function (callback) {
    run(['prod-clean','dev-clean'], callback);
});

gulp.task(dclean, function () {
    gulp.src(path.dev, { read: false })
        .pipe(clean());
});

gulp.task(pclean, function () {
    gulp.src(path.prod, { read: false })
        .pipe(clean());
});
/* CLEAN END */



/* DEPLOY */
var ddeploy = 'dev-deploy',
    pdeploy = 'prod-deploy';
gulp.task(ddeploy, function() {
    return surge({
        project: path.dev,
        domain: CNAME,
    });
});

gulp.task(pdeploy, function() {
    return surge({
        project: path.prod,
        domain: CNAME,
    });
});
/* BUILDS END */


/* BUILDS */
var dbuild = 'dev-build',
    pbuild = 'prod-build';
gulp.task(dbuild, function(callback) {
    run(dclean, [views, images, dstyles, dscripts, dbootstrapcss, dbootstrapjs], ddeploy, callback);
});

gulp.task(pbuild, function(callback) {
    run(pclean, [views, images, pstyles, pscripts, pbootstrapjs, pbootstrapcss], callback);
});
/* BUILDS END */



/* WATCH */

gulp.task('watch', function() {
    gulp.watch(path.sviews + '/**/*', [views, ddeploy]);
    gulp.watch(path.sscripts + '/**/*', [dscripts, dbootstrapjs, ddeploy]);
    gulp.watch(path.sstyles + '/**/*', [dstyles, dbootstrapcss, ddeploy]);
});

gulp.task('prod-watch', function() {
    gulp.watch(path.sviews + '/**/*', [views, pdeploy]);
    gulp.watch(path.sscripts + '/**/*', [pscripts, pbootstrapjs, pdeploy]);
    gulp.watch(path.sstyles + '/**/*', [pstyles, pbootstrapcss, pdeploy]);
});
/* WATCH END */



gulp.task('default', [dbuild], function() {
  // place code for your default task here
});
