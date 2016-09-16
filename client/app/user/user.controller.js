'use strict';

angular.module('inmobiliariaApp')
  .controller('UserCtrl', function ($scope, $cookieStore, Auth, Company) {
    
    var cookieCompany = $cookieStore.get('Company');
    
    $scope.mainUser = Auth.getCurrentUser();
    $scope.users = [];
    
    if (cookieCompany) {
      Company.getCompanyUsers({ id: cookieCompany })
        .$promise.then(function (company) {
          $scope.users = company.users;
      });
    } 
});
