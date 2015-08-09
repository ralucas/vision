// Application dependencies
var express = require('express'),
    http = require('http'),
    config = require('../configuration'),
    db = require('../db'),
    routes = require('../routes'),
    notFound = require('../middleware/notFound'),
    id = require('../middleware/id'),
    app = express();

// Sets the port with nconf configuration call
app.set('port', config.get('express:port'));

/*
* Middleware
*/

// Middleware provided by express for parsing forms or json
app.use( express.bodyParser() );

// Middleware provided by express for logging
app.use(express.logger({
    immediate: true,
    format: 'dev'
}));

// Let's validate the id before passing the request
// down the line
app.param('id', id.validate);

//Routes
routes(app);

// Middleware for 404 Not Found
app.use(notFound.index);

// Creates the server and listens
http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port: ' + app.get('port'));
});

module.exports = app;
