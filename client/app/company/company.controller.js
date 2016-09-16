'use strict';

angular.module('inmobiliariaApp')
  .controller('CompanyCtrl', function ($scope, $http, $location, Company) {

    $scope.addCompany = function() {
      if($scope.company.name === '') { return; }

      Company.save({ name: $scope.company.name }).$promise.then(function() {
        $location.path('/main');
      }, function(err) {
        // fail
        console.log(err);
      });

      // $http.post('/api/company', { name: $scope.company.name })
      //   .then(function () {
      //     $location.path('/main');
      //   });
    };

  });
