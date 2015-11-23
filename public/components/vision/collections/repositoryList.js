
Vision.RepositoryList = Backbone.Collection.extend({
  projectId: '',
  
  model: Vision.Repository,

  url: function() {
    return '/project/' + this.projectId + '/repos';
  },

  initialize: function(items, item) {
    this.projectId = item.projectId;
  },

  parse: function(response) {
    response.id = response._id;
    return response;
  }
});
