(function() {
  'use strict';

  angular.module('ngMomentInput', []).directive('ngMomentInput', directive);

  function directive() {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        ctrl.$parsers.push(parse);
        ctrl.$formatters.push(format);
        elm.on('blur', repaint);
        scope.$watch(function() {return ctrl.$modelValue;}, repaint, true);

        function parse(str) {
          var formats = [
            'DD.MM.YYYY HH:mm',
            'DDMMYYYY HH:mm',
            'YYYY-MM-DD HHmm',
            'DD.MM.YYYY HHmm'
          ];
          var date = moment(str, formats, true);
          var valid = date.isValid();
          ctrl.$setValidity('date', valid);
          return valid ? date : undefined;
        }

        function format(date) {
          return (date && date.format) ? date.format('DD.MM.YYYY HH:mm') : '';
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
