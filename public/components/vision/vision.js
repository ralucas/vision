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

Backbone.View.prototype.event_aggregator = _.extend({}, Backbone.Events);

