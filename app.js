var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var maps = require('./routes/maps');

var Grid = require('./public/javascripts/Grid');
var Farm = require('./public/javascripts/Farm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// --- load some shit -- //

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/javascripts", express.static("./outJavascripts"));

var loader = require('./public/javascripts/Loader').getInstance();
loader.loadSet('Generated.csv', true);
//loader.cleanSet(true, true); # not needed since set is already clean

var grid = new Grid(loader.getCurrentSet(), 500);
var farms = grid.getFarms();

var testGrid = new Grid(farms[4].pins ,15);
var testChunks = testGrid.getEdgeChunks();
var points = [];

for (var i = 0; i < testChunks.length; i++){
  var chunkPins = testChunks[i].pins;
  for (var ii = 0; ii < chunkPins.length; ii++){
    points.push(chunkPins[ii]);
  }
}

var farm = new Farm(points);
farms.push(farm);

farms.forEach(function (farm) {
  if (!farm.hasBoundary()){
    farm.createBoundary(20);
  }
});

loader.setFarms(farms);

app.use('/', index);
app.use('/users', users);
app.use('/maps', maps);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
