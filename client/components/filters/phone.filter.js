


'use strict';

angular.module('inmobiliariaApp')
  .filter('tel', function () {
    return function (tel) {
      if (!tel) { return ''; }
      
      var value = tel.toString().trim().replace(/^\+/, '');
      
      if (value.match(/[^0-9]/)) { return tel; }
      
      var city = value.slice(0, 3);
      var number = value.slice(3);

      if (number) {
        if(number.length>3) {
          number = number.slice(0, 3) + '-' + number.slice(3,7);
        }
        else {
          number = number;
        }
        return ("(" + city + ") " + number).trim();
      }
      else {
        return "(" + city;
      }
    };
  });
