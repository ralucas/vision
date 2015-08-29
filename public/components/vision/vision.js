var Vision = Vision || {};

Vision.Application = function() {
  this.start = function() {
    var router = new Vision.Router();
    Backbone.history.start();
    router.navigate('index', true);
  };
};

$(function() {
  var app = new Vision.Application();
  app.start();
});

Vision.Router = Backbone.Router.extend({
  projectListView: '',

  routes: {
    '': 'index'
  },

  initialize: function() {
    this.project();
  },

  project: function() {
    this.projectListView = new Vision.ProjectListView();
  },

  index: function() {
    this.projectListView.render();
  }
})
