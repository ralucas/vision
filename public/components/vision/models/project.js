
Vision.Project = Backbone.Model.extend({
  defaults: {
    id: '',
    name: ''
  },
  
  idAttributes: '_id',

  urlRoot: '/project'
});
