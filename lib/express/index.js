// Application dependencies
var express = require('express'),
    http = require('http'),
    config = require('../configuration'),
    db = require('../db'),
    heartbeat = require('../routes/heartbeat'),
    project = require('../routes/project'),
    notFound = require('../middleware/notFound'),
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

// Middleware for 404 Not Found
app.use(notFound.index);

/*
* Routing
*/

// Gets the heartbeat.js route
app.get('/heartbeat', heartbeat.index);

// Post to the project route calls post method to api
app.post('/project', project.post);

// Creates the server and listens
http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port: ' + app.get('port'));
});

module.exports = app;
