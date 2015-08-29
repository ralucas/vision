'use strict';

exports.index = function(req, res) {
  var model = {
    title: 'vision.',
    description: 'a project based dashboard for github',
    author: 'dudeman',
    user: 'Someones Name'
  };
  res.render('index', model);
};
