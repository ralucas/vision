/*
* Routing
*/
var heartbeat = require('../routes/heartbeat'),
    project = require('../routes/project'),
		github = require('../routes/github');

module.exports = function(app) {

    // Gets the index.html
    app.get('/', home.index);

		// Gets the heartbeat.js route
		app.get('/heartbeat', heartbeat.index);

		// Post to the project route calls post method to api
		app.post('/project', project.post);

		// Get the project by id
		app.get('/project/:id', project.get);

		// Update the project by id
		app.put('/project/:id', project.put);

		// Delete the project by id
		app.del('/project/:id', project.del);

		// Get list of all projects
		app.get('/project', project.all);

		// Get list of repos from Github
		app.get('/project/:id/repos', github.repos);

		// Get list of commits from Github
		app.get('/project/:id/commits', github.commits);

		// Get list of issues from Github
		app.get('/project/:id/issues', github.issues);
};		

