/* eslint-env jasmine, node */
/* global moment, inject */
describe('ngMomentInput', function() {
  'use strict';

  var compileElement;
  var scope;
  var inputHtml = '<input name="input" ng-model="x" ng-moment-input="config">';

  beforeEach(module('ngMomentInput'));
  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope;
    compileElement = function(html) {
      return $compile(html)(scope);
    };
  }));

  it('test normal ngModel', function() {
    var input = compileElement('<input name="input" ng-model="x">');
    scope.$apply('x = 22;');
    expect(scope.x).toBe(22);
    expect(input.val()).toBe('22');
  });

  it('should parse a date', function() {
    var input = compileElement(inputHtml);
    scope.$apply('x = undefined;');
    input.val('2015-02-01').triggerHandler('input');
    expect(moment.isMoment(scope.x)).toBe(true);
    expect(scope.x.format('YYYY-MM-DDTHH:mm:ss')).toBe('2015-02-01T00:00:00');
  });

  it('should reformat the input date', function() {
    scope.config = {formats: ['DD.MM.YYYY HH:mm', 'DDMMYYYY HH:mm']};
    var input = compileElement(inputHtml);
    input.val('01022015 12:34').triggerHandler('input');
    expect(input.val()).toBe('01.02.2015 12:34');
  });

  it('should render the model value', function() {
    scope.config = {formats: ['DD.MM.YYYY HH:mm']};
    var input = compileElement(inputHtml);
    scope.x = moment('2015-02-01T12:34:00');
    scope.$digest();
    expect(input.val()).toBe('01.02.2015 12:34');
    scope.x = moment('2016-02-01T12:34:00');
    scope.$digest();
    expect(input.val()).toBe('01.02.2016 12:34');
  });

  it('should parse a date in UTC mode', function() {
    scope.config = {moment: moment.utc};
    var input = compileElement(inputHtml);
    scope.$apply('x = undefined;');
    input.val('2015-02-01').triggerHandler('input');
    expect(moment.isMoment(scope.x)).toBe(true);
    expect(scope.x.format()).toBe('2015-02-01T00:00:00+00:00');
  });

});
