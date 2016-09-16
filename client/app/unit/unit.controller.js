'use strict';

angular.module('inmobiliariaApp')
  .controller('UnitCtrl', function ($scope, $cookieStore, $uibModal, $aside, Building, Unit) {
    
  $scope.units = [];
  var cookieBuilding = $cookieStore.get('Building');
  var cookieCompany = $cookieStore.get('Company');
  
  $scope.sortType     = 'building.name';
  $scope.sortReverse  = false;
  $scope.searchFilter = '';

  if (cookieBuilding) {
    Unit.getBuildingUnits({
        id: cookieBuilding
      })
      .$promise.then(function(units) {
        $scope.units = units;
      });
  } else {
    Building.getCompanyUnits({
        id: cookieCompany
      })
      .$promise.then(function(buildings) {
        buildings.forEach(function(building) {
          building.units.forEach(function(unit) {
            $scope.units.push(unit);
          });
        });
      });
  }

  $scope.create = function () {
    var modalInstance = $uibModal.open({
      animation:    true,
      templateUrl:  'app/unit/unit.modal.create.html',
      controller:   'CreateUnitModalCtrl',
      resolve:      {}
    });

    modalInstance.result.then(function (units) {
      //on ok button press
      $scope.units = units;
    }, function () {
      //on cancel button press
      console.log('Modal Closed');
    });
  };

  $scope.edit = function (unitId) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'app/unit/unit.modal.edit.html',
      controller: 'EditUnitModalCtrl',
      resolve: {
        unitId: function () {
          return unitId;
        }
      }
    });

    modalInstance.result.then(function (units) {
      //on ok button press
      $scope.units = units;
    }, function () {
      //on cancel button press
      console.log('Modal Closed');
    });
  };
  
  $scope.viewCont = function (contractId) {
    
    var modalAside = $aside.open({
      templateUrl: 'app/contract/contract.modal.view.html',
      placement: 'right',
      size: 'md',
      backdrop: true,
      controller: 'ViewContractModalCtrl',
      resolve: {
        contractId: function () {
          return contractId;
        }
      }
    });

    modalAside.result.then(function () {
      //on ok button press
    }, function () {
      //on cancel button press
      console.log('Modal Closed');
    });
  };
});

angular.module('inmobiliariaApp')
  .controller('CreateUnitModalCtrl', function ($scope, $uibModalInstance, $cookieStore, Building, Unit) {

  $scope.unit = {};
  var cookieBuilding  = $cookieStore.get('Building');
  //var cookieCompany   = $cookieStore.get('Company');

  $scope.create = function (form) {
    if (form.$valid) {
      Unit.save({
        local: $scope.unit.local,
        surface: $scope.unit.surface,
        type: $scope.unit.type,
        description: $scope.unit.description,
        ocupated: $scope.unit.ocupated,
        building: cookieBuilding
      })
      .$promise.then(function (unit) {
        
        return Building.get({ id: cookieBuilding })
        .$promise.then(function (building) {
          building.units.push(unit);
          return building;
        });
      })
      .then(function (building) {
      
        return Building.update({ id: building._id }, building)
        .$promise.then(function (building) {
          return building;
        });
      })
      .then(function (building) {
        
        return Unit.getBuildingUnits({ id: building._id })
        .$promise.then(function (units) {
          $uibModalInstance.close(units);
        });
      })
      .catch(function(err) {
        if(err) console.log(err);
      });
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('inmobiliariaApp')
  .controller('EditUnitModalCtrl', function ($scope, $uibModalInstance, $cookieStore, unitId, Building, Unit) {
    
  var units  = [];
  var cookieBuilding  = $cookieStore.get('Building');
  var cookieCompany   = $cookieStore.get('Company');

  Unit.get({ id: unitId }, function (unit) {
    $scope.unit = unit;
  });

  $scope.edit = function (form) {
    if (form.$valid) {
      Unit.update({ id: $scope.unit._id }, {
        local: $scope.unit.local,
        surface: $scope.unit.surface,
        type: $scope.unit.type,
        description: $scope.unit.description,
        ocupated: $scope.unit.ocupated
      })
      .$promise.then(function () {
        
        if (cookieBuilding) {
          
          return Unit.getBuildingUnits({ id: cookieBuilding })
            .$promise.then(function(units) {
              $uibModalInstance.close(units);
          });
        }
        else {
          
          return Building.getCompanyUnits({ id: cookieCompany })
            .$promise.then(function (buildings) {
              buildings.forEach(function (building) {
                building.units.forEach(function (unit) {
                  units.push(unit);
                });
              });
              $uibModalInstance.close(units);
          });
        }
      })
      .catch(function(err) {
        if(err) console.log(err);
      });
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

