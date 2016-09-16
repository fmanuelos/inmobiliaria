'use strict';

angular.module('inmobiliariaApp')
  .controller('FooterCtrl', function ($scope, $location, $anchorScroll) {


    $scope.CurrentDate = new Date();

    $scope.goTop = function() {
      // set the location.hash to the id
      //$location.hash('main');

      $anchorScroll();
    };
  });
