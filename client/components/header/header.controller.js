'use strict';

angular.module('inmobiliariaApp')
  .controller('HeaderCtrl', function ($scope, $http, $location, $cookieStore, $rootScope, $state, $uibModal, Auth, Company, Building) {
    
    $scope.companyName = '';
    $scope.buildings    = [];
    var cookieCompany   = $cookieStore.get('Company');
    var cookieBuilding  = $cookieStore.get('Building');
    var getCurrentUsers = Auth.getCurrentUser();
    
    if ($rootScope.company && cookieCompany) {
      $scope.companyName = $rootScope.company.name;
      $scope.buildings = $rootScope.company.buildings;
    }
    else {
      Company.getUserCompany({ id: getCurrentUsers._id }).$promise.then(function(company) {
        if (cookieCompany !== company._id) { $cookieStore.put('Company', company._id); }
        $rootScope.company = company;
        $scope.companyName = company.name;
        $scope.buildings = company.buildings;
      });
    }
    
    if (!$rootScope.building && cookieBuilding) {
      Building.get({ id: cookieBuilding }).$promise.then(function(building) {
        $rootScope.building = building;
      });
    }

    $scope.isCollapsed    = true;
    $scope.isLoggedIn     = Auth.isLoggedIn;
    $scope.isAdmin        = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.putBuilding = function(buildingId) {
      $cookieStore.put('Building', buildingId);      
      Building.get({ id: buildingId }).$promise.then(function (building) {
        $rootScope.building = building;
      });
      $state.reload();
    };
    
    $scope.removeBuilding = function() {
      $cookieStore.remove('Building');
      $rootScope.building = {};
      $state.reload();
    };

    $scope.newBuilding = function() {
      //$cookieStore.remove('Building');
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/building/building.html',
        controller: 'NewBuildingModalCtrl',
        resolve: {}
      });

      modalInstance.result.then(function(result) {
        //on ok button press
        $scope.buildings   = result.buildings;
        $rootScope.building = result.building;
        $state.reload();
       //console.log('Modal OK');
      }, function () {
        //on cancel button press
        console.log('Modal Closed');
      });
    };

    $scope.help = function() {
      //$cookieStore.remove('Building');
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'components/help/help.html',
        controller: 'HelpModalCtrl',
        size: 'lg',
        resolve: {
          path: function() {
            return $location.path().replace("/", "");
          }
        }
      });

      modalInstance.result.then(function () {
        //on ok button press
      }, function () {
        //on cancel button press
        console.log('Modal Closed');
      });
    };

    $scope.toggle = function() {
      $rootScope.toggleAside = $rootScope.toggleAside === true ? false: true;
    };

    $scope.logout = function() {
      Auth.logout();
      $cookieStore.remove('Company');
      $cookieStore.remove('Building');
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
