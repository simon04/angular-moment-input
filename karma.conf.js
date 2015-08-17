/* eslint-env node */
module.exports = function(config) {
  'use strict';

  config.set({

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/moment/moment.js',
      'dist/*.min.js',
      'test/*.js'
    ],

    frameworks: ['jasmine'],
    browsers: ['Firefox']

  });
};
