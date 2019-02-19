//gulpfile for udacity

const gulp= require('gulp');
const http = require('http');
const connect = require('connect');
const serverStatic = require('serve-static');
const jasmine = require('gulp-jasmine');


gulp.task('default', ()=>{
    console.log('it works');
});

gulp.task('runTestCases', ()=>{
    gulp.src('js/*.js','jasmine/spec/feedreader.js')
        .pipe(jasmine());

});

gulp.task('index',(done)=>{
    const app = connect().use(serverStatic('.',{'index': ['default.html', 'default.htm', 'index.html']}));
    http.createServer(app).listen(9000,done);
})

