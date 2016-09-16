'use strict';

angular.module('inmobiliariaApp')
  .controller('ContractCtrl', function($scope, $cookieStore, $uibModal, $aside, Building, Contract) {

    $scope.contracts    = [];
    var cookieBuilding  = $cookieStore.get('Building');
    var cookieCompany   = $cookieStore.get('Company');

    $scope.sortType     = 'building.name';
    $scope.sortReverse  = false;
    $scope.searchFilter = '';

    $scope.sumTotals = {};

    var _sumTotals = function(contracts) {
      var total = {
        dlls:   [0, 0],
        pesos:  [0, 0],
      };
      contracts.forEach(function(contract) {
        if (contract.customer.currency === 'dolares') {
          total.dlls[0] += contract.monthlyRent;
          total.dlls[1] += contract.maintenanceFee;
        } else if (contract.customer.currency === 'pesos') {
          total.pesos[0] += contract.monthlyRent;
          total.pesos[1] += contract.maintenanceFee;
        }
      });
      return total;
    };

    if (cookieBuilding) {
      Contract.getBuildingContracts({
        id: cookieBuilding
      }).$promise.then(function(contracts) {
        $scope.contracts = contracts;
        $scope.sumTotals = _sumTotals(contracts);

      });
    } else {
      Building.getCompanyContracts({
        id: cookieCompany
      }).$promise.then(function(buildings) {
        buildings.forEach(function(building) {
          building.contracts.forEach(function(contract) {
            $scope.contracts.push(contract);
          });
        });
        $scope.sumTotals = _sumTotals($scope.contracts);
      });
    }

    $scope.create = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/contract/contract.modal.create.html',
        controller: 'CreateContractModalCtrl',
        size: 'lg',
        resolve: {}
      });

      modalInstance.result.then(function(contracts) {
        //on ok button press
        $scope.contracts = contracts;
      }, function() {
        //on cancel button press
        console.log('Modal Closed');
      });
    };

    $scope.edit = function(contractId) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/contract/contract.modal.edit.html',
        controller: 'EditContractModalCtrl',
        size: 'lg',
        resolve: {
          contractId: function() {
            return contractId;
          }
        }
      });

      modalInstance.result.then(function(contracts) {
        //on ok button press
        $scope.contracts = contracts;
      }, function() {
        //on cancel button press
        console.log('Modal Closed');
      });
    };

    $scope.view = function(contractId) {
      var modalAside = $aside.open({
        templateUrl: 'app/contract/contract.modal.view.html',
        placement: 'right',
        size: 'md',
        backdrop: true,
        controller: 'ViewContractModalCtrl',
        resolve: {
          contractId: function() {
            return contractId;
          }
        }
      });

      modalAside.result.then(function() {
        //on ok button press
      }, function() {
        //on cancel button press
        console.log('Modal Closed');
      });
    };

  });


angular.module('inmobiliariaApp')
  .controller('CreateContractModalCtrl', function($scope, $uibModalInstance, $cookieStore, Contract, Unit, Building) {

    $scope.contract = {};
    $scope.contract.taxRate = 16;
    $scope.contracts = [];
    //$scope.contracts = contracts;

    var cookieBuilding = $cookieStore.get('Building');
    //var cookieCompany = $cookieStore.get('Company');

    if (cookieBuilding) {
      Building.get({
        id: cookieBuilding
      }).$promise.then(function(building) {
        $scope.units = building.units;
        $scope.customers = building.customers;
      });
    }

    $scope.create = function(form) {
      if (form.$valid) {

        Contract.save({
            name: $scope.contract.name,
            notes: $scope.contract.notes,
            startDate: $scope.contract.startDate,
            endDate: $scope.contract.endDate,
            monthlyRent: $scope.contract.monthlyRent,
            taxRate: $scope.contract.taxRate,
            currency: $scope.contract.currency,
            paymentMethod: $scope.contract.paymentMethod,
            deposit: $scope.contract.deposit,
            guarantee: $scope.contract.guarantee,
            maintenanceFee: $scope.contract.maintenanceFee,
            taxOverdue: $scope.contract.taxOverdue,
            marginsDay: $scope.contract.marginsDay,
            unit: $scope.contract.unit,
            customer: $scope.contract.customer
          })
          .$promise.then(function(contract) {

            Unit.get({
              id: $scope.contract.unit._id
            }, function(unit) {
              unit.contracts.push(contract);

              Unit.update({
                id: unit._id
              }, unit, function(unit) {

                Unit.getContractCustomer({
                  id: unit.building
                }, function(units) {
                  units.forEach(function(unit) {
                    unit.contracts.forEach(function(contract) {
                      $scope.contracts.push(contract);
                    });
                  });
                  $uibModalInstance.close($scope.contracts);
                });
              });
            });
          });
      }
    };

    $scope.ok = function() {
      $uibModalInstance.close();
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });



angular.module('inmobiliariaApp')
  .controller('EditContractModalCtrl', function($scope, $uibModalInstance, $cookieStore, contractId, Unit, Building, Contract) {

    $scope.contractId = contractId;
    $scope.contract = {};
    $scope.contracts = [];

    var cookieBuilding = $cookieStore.get('Building');
    //var cookieCompany = $cookieStore.get('Company');

    Contract.get({
      id: $scope.contractId
    }, function(contract) {
      $scope.contract = contract;
    });

    if (cookieBuilding) {
      Building.get({
        id: cookieBuilding
      }).$promise.then(function(building) {
        $scope.units = building.units;
        $scope.customers = building.customers;
      });
    }

    $scope.edit = function(form) {
      if (form.$valid) {
        Contract.update({
            id: $scope.contract._id
          }, {
            name: $scope.contract.name,
            notes: $scope.contract.notes,
            startDate: $scope.contract.startDate,
            endDate: $scope.contract.endDate,
            monthlyRent: $scope.contract.monthlyRent,
            taxRate: $scope.contract.taxRate,
            currency: $scope.contract.currency,
            paymentMethod: $scope.contract.paymentMethod,
            deposit: $scope.contract.deposit,
            guarantee: $scope.contract.guarantee,
            maintenanceFee: $scope.contract.maintenanceFee,
            taxOverdue: $scope.contract.taxOverdue,
            marginsDay: $scope.contract.marginsDay,
            unit: $scope.contract.unit,
            customer: $scope.contract.customer
          })
          .$promise.then(function() {

            Unit.getContractCustomer({
              id: cookieBuilding
            }).$promise.then(function(units) {
              units.forEach(function(unit) {
                unit.contracts.forEach(function(contract) {
                  $scope.contracts.push(contract);
                });
              });
              $uibModalInstance.close($scope.contracts);
            });
          });
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });


angular.module('inmobiliariaApp')
  .controller('ViewContractModalCtrl', function($scope, $uibModalInstance, contractId, Contract) {

    Contract.get({
      id: contractId
    }, function(contract) {
      $scope.contract = contract;
    });

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });
