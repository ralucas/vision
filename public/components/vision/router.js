//Backbone Router
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
});

