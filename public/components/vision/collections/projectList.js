
Vision.ProjectList = Backbone.Collection.extend({
  model: Vision.Project,

  url: function() {
    return '/project/';
  },

  initialize: function() {
    this.fetch();
  }
});
