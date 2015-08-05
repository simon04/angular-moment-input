module.exports = function(config) {
  'use strict';

  config.set({

    basePath: '../',
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/moment/moment.js',
      'src/*.js',
      'test/unit/**/*.js'
    ],

    logLevel: config.LOG_INFO,
    colors: true,

    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
