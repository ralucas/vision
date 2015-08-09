'use strict';

var ProjectSchema = require('../models').model('Project'),
		GithubRepo = require('../github'),
    util = require('util'),
		_ = require('lodash');

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

Project.prototype.get = function(id, callback) {
		var query = {"_id": id};

		ProjectSchema.findOne(query, function(error, project) {
				if (error) return callback(error, null);

				return callback(null, project);
		});
};

Project.prototype.put = function(id, update, callback) {
		var query = {"_id": id};
		delete update._id;

		ProjectSchema.findOne(query, function(error, project) {
				if (error) return callback(error, null);
				if (project === null) return callback(null, null);

				ProjectSchema.update(query, update, function(error, project) {
						if (error) return callback(error, null);
						return callback(null, {});
				});
		});
};

Project.prototype.del = function(id, callback) {
		var query = {"_id": id};

		ProjectSchema.findOne(query, function(error, project) {
				if (error) return callback(error, null);
				if (project === null) return callback(null, null);
				
				project.remove(function(error) {
						if (error) return callback(error, null);
						return callback(null, {});
				});
		});
};

Project.prototype.all = function(id, callback) {
		var query = {"user": id};

		ProjectSchema.find(query, function(error, projects) {
				if (error) return callback(error, null);

				return callback(null, projects);
		});
};

Project.prototype.repos = function(id, callback) {
	  var items = [];

		ProjectSchema.findOne({"_id": id}, function(error, project) {
				if (error) return callback(error, null);
				if (project === null) return callback(null, null);

				var githubRepo = new GithubRepo(project.token, project.user);

				githubRepo.repositories(function(error, response) {
						if (error) return callback(error, null);
						if (response === null) return callback("Error getting repositories", null);

						items = response.map(function(model) {
								var item = _.pick(model, ['id', 'name', 'description']);
								var enabled = _.find(project.repositories, function(p) {
										return p === item.name;
								});
								if (enabled) item.enabled = 'checked';
								return item;
						});

						return callback(null, items);
				});		
		});
};

Project.prototype.commits = function(id, callback) {
		ProjectSchema.findOne({"_id": id}, function(error, project) {
				if (error) return callback(error, null);
				if (project === null) return callback(null, null);

				var githubRepo = new GithubRepo(project.token, project.user);

				githubRepo.commits(project.repositories, function(error, response) {
						if (error) return callback(error, null);
						if (!response) return callback(null, null);
						return callback(null, response);
				});
		});
};

Project.prototype.issues = function(id, callback) {
		ProjectSchema.findOne({"_id": id}, function(error, project) {
				if (error) return callback(error, null);
				if (project === null) return callback(null, null);

				var githubRepo = new GithubRepo(project.token, project.user);

				githubRepo.issues(project.repositories, function(error, response) {
						if (error) return callback(error, null);
						if (!reponse) return callback(null, null);

						return callback(null, response);
				});
		});
};

module.exports = Project;
