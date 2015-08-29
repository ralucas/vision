var _ = require('lodash'),
		login = require('../environment.json'),
		mongoose = require('mongoose'),
		app = require('../app'),
		request = require('supertest'),
		assert = require('chai').assert;

// Before each test, let's connect to the db
// and insert a document for testing 
beforeEach(function(done) {
		mongoose.connection.collections['projects'].drop(function(err) {
				var proj = {
						name: 'test name',
						user: login.user,
						token: login.token,
						repositories: [ 'node-plates' ]
				};

				mongoose.connection.collections['projects']
						.insert(proj, function(err, docs) {
								id = docs[0]._id;
								done();
						});
		});
});

describe('when creating a new resource /project', function() {
		var project = {
				name: 'new project',
				user: login.user,
				token: login.token,
				repositories: [ '12345', '9898' ]
		};
		it('should respond with 201', function(done) {
				request(app)
						.post('/project')
						.send(project)
						.expect('Content-Type', /json/)
						.expect(201)
						.end(function(err, res) {
								var proj = JSON.parse(res.text);
								assert.equal(proj.name, project.name);
								assert.equal(proj.user, login.user);
								assert.equal(proj.token, login.token);
								assert.equal(proj.repositories[0], project.repositories[0]);
								assert.equal(proj.repositories[1], project.repositories[1]);
								assert.equal(res.header['location'], '/project/' + proj._id);
								done();
						});

		});
});

describe('when requesting an available resource /project/:id', function() {
		it('should respond with a 200', function(done) {
				request(app)
					.get('/project/' + id)
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(err, res) {
							var proj = JSON.parse(res.text);
							assert.equal(proj._id, id);
							assert(_.has(proj, '_id'));
							assert(_.has(proj, 'name'));
							assert(_.has(proj, 'user'));
							assert(_.has(proj, 'token'));
							assert(_.has(proj, 'created'));
							assert(_.has(proj, 'repositories'));
							done();
					});
		});
});

describe('when updating an existing resource /project/:id', function() {
		var project = {
				name: "new test name",
				user: login.user,
				token: login.token,
				repositories: ['12345', '9898']
		};

		it('should respond with 204', function(done) {
				request(app)
					.put('/project/' + id)
					.send(project)
					.expect(204, done);
		});
});

describe('when deleting an existing resource /project/:id', function() {
		it('should respond with 204', function(done) {
				request(app)
					.del('/project/' + id)
					.expect(204, done);
		});
});

describe('when requesting resource get all projects', function() {
		it('should respond with 200', function(done) {
				request(app)
					.get('/project/?user' + login.user)
					.expect('Content-Type', /json/)
					.expect(200)
					.end(function(err, res) {
							var proj = _.first(JSON.parse(res.text));
							assert(_.has(proj, '_id'));
							assert(_.has(proj, 'name'));
							assert(_.has(proj, 'user'));
							assert(_.has(proj, 'token'));
							assert(_.has(proj, 'created'));
							assert(_.has(proj, 'repositories'));
							done();
					});
		});
});

//describe('when requesting resource the /lastPublicPush', function() {
		//var username = 'ralucas';
		//it ('should respond with a 200', function(done) {
				//request(app)
					//.get('/lastPublicPush')
					//.query(username)
					//.expect(200)
					//.expect('Content-Type', /json/)
					//.end(function(err, res) {
							////check for correct response here
							//done();
				//});
		//});
//});
