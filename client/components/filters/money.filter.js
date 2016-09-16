'use strict';

angular.module('inmobiliariaApp')
    .filter('money', function () {
        var num;
        return function (input) {
          if (!isNaN(input)) {
            num = (input / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            return '$' + num;
          }
          else {
            return input;
          }
        };
    });
