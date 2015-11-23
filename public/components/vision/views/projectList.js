
Vision.ProjectListView = Backbone.View.extend({
  Project: [],

  el: $('ul#projects-list'),

  initialize: function() {
    this.collection = new Vision.ProjectList(this.Projects);
    this.collection.on('add', this.add, this);
  },

  add: function(project) {
    var projectView = new Vision.ProjectView({
      model: project
    });

    this.$el.append(projectView.render().el);
    return projectView;
  }
});
