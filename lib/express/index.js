// Application dependencies
var express = require('express'),
    http = require('http'),
    config = require('../configuration'),
    heartbeat = require('../routes/heartbeat'),
    notFound = require('../middleware/notFound'),
    app = express();

// Sets the port with nconf configuration call
app.set('port', config.get('express:port'));

// Gets the heartbeat.js route
app.get('/heartbeat', heartbeat.index);

// Middleware provided by express for logging
app.use(express.logger({
    immediate: true,
    format: 'dev'
}));

// Middleware for 404 Not Found
app.use(notFound.index);

// Creates the server and listens
http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port: ' + app.get('port'));
});

module.exports = app;
