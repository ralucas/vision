var winston = require('winston'),
    config = require('../configuration');

/*
* @function Logger
*
* @returns {file} logfile from express.logger
*/
function Logger() {
    return winston.add(winston.transports.File, {
        filename: config.get('logger:filename'),
        maxsize: 1048576, // 1MB
        maxFiles: 3,
        level: config.get('logger:level')
    });
}

module.exports = new Logger();