var ProjectSchema = require('../models').model('Project'),
    util = require('util');

//instantiates project constructor
function Project() {}

Project.prototype.post = function(name, data, callback) {
    var query = { 'name': name };
    var project = new ProjectSchema(data);
    // check to see if project exists via findone
    ProjectSchema.findOne(query, function(error, proj) {
        if (error) {
            return callback(error, null);
        }
        if (proj !== null) {
            return callback(null, null);
        }
        //saves project
        project.save(function(error, p) {
            if (error) {
                return callback(error, null);
            }
            return callback(null, p);
        });
    });
};



console.log('hi', util.inspect(Project.post));

module.exports = Project;