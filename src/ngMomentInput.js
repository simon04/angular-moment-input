(function() {
  'use strict';
  /* global angular moment */

  angular.module('ngMomentInput', []).directive('ngMomentInput', directive);

  function directive() {
    return {
      require: 'ngModel',
      scope: {
        ngMomentInput: '='
      },
      link: function(scope, elm, attrs, ctrl) {

        var config = angular.extend({
          moment: moment,
          formats: ['YYYY-MM-DD'],
          strict: true
        }, scope.ngMomentInput);

        ctrl.$parsers.push(parse);
        ctrl.$formatters.push(format);
        elm.on('blur', repaint);
        scope.$watch(function() {return ctrl.$modelValue;}, repaint, true);

        function parse(str) {
          var date = config.moment(str, config.formats, config.strict);
          var valid = date.isValid();
          ctrl.$setValidity('date', valid);
          return valid ? date : undefined;
        }

        function format(date) {
          return (date && date.format) ? date.format(config.formats[0]) : '';
        }

        function repaint() {
          if (ctrl.$modelValue) {
            ctrl.$viewValue = format(ctrl.$modelValue);
            ctrl.$render();
          }
        }
      }
    };
  }

})();
