
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

// vhost apps
var publisher_localhost = require('./websites/publisher/app');
var camerastork_localhost = require('./websites/camerastork/app');

app.configure(function(){
  app.set('port', process.env.PORT || 1337);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // apply the vhost middleware, before the router middleware
  app.use(express.vhost('www.publisher.com', publisher_localhost))
  app.use(express.vhost('www.camerastork.com', camerastork_localhost));

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("vhost enabled Express server listening on port " + app.get('port'));
});
