
Vision.RepositoryView = Backbone.View.extend({
  tagName: 'li',

  viewTemplate: visiontemplates['templates/repositories.hbs'],

  render: function() {
    this.$el.html(this.viewTemplate(this.model.toJSON()));
    return this;
  }
});

