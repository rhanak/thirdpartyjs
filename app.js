
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , virtualhost = require('virtualhost');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Example of standard handler
// This one will simply write "handler1" at "sub.domain.tld/*"
var publisher = app.get('/', routes.publisher);

// Example of Express 3.x app
// Good guy Express now simply returns standard handler, which makes this directly usable in virtualhost :)
// This one will write "handler2 (www.)" at "www.domain.tld/" and "handler2 (undefined)" at "domain.tld/"
var camerastork = app.get('/', routes.camerastork);

// Example of virtualhost configuration
var apps = {
  publisher: { pattern: /^(www\.)?publisher\.com$/, handler: publisher },
  camerastork: { pattern: /^(www\.)?camerastork\.com$/, handler: camerastork }
};

http.createServer(virtualhost(apps)).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');
