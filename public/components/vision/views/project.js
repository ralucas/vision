
Vision.ProjectView = Backbone.View.extend({
  tagName: 'li',

  viewTemplate: visiontemplates['templates/projects.hbs'],

  render: function() {
    var project = this.viewTemplate(this.model.toJSON());
    this.$el.html(project);
    return this;
  }
});

