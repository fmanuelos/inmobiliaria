'use strict';

angular.module('inmobiliariaApp')
  .controller('CustomerCtrl', function ($scope, $cookieStore, $uibModal, $aside, Building, Customer) {

    $scope.customers = [];
    var cookieBuilding = $cookieStore.get('Building');
    var cookieCompany = $cookieStore.get('Company');

    $scope.sortType     = 'building.name';     // set the default sort type
    $scope.sortReverse  = false;               // set the default sort order
    $scope.searchFilter = '';                  // set the default search/filter term

    if (cookieBuilding) {
      Customer.getBuildingCustomers({ id: cookieBuilding })
        .$promise.then(function (customers) {
          $scope.customers = customers;
      });
    }
    else {
      Building.getCompanyCustomers({ id: cookieCompany })
        .$promise.then(function (buildings) {
          buildings.forEach(function (building) {
            building.customers.forEach(function (customer) {
              $scope.customers.push(customer);
            });
          });
      });
    }

    $scope.create = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/customer/customer.modal.create.html',
        controller: 'CreateCustomerModalCtrl',
        size: 'lg',
        resolve: {}
      });

      modalInstance.result.then(function (customers) {
        //on ok button press
        $scope.customers  = customers;
      }, function () {
        //on cancel button press
        console.log('Modal Closed');
      });
    };

    $scope.edit = function (customerId) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'app/customer/customer.modal.edit.html',
        controller: 'EditCustomerModalCtrl',
        size: 'lg',
        resolve: {
          customerId: function () {
            return customerId;
          }
        }
      });

      modalInstance.result.then(function (customers) {
        //on create button press
        $scope.customers  = customers;
      }, function () {
        //on cancel button press
        console.log('Modal Closed');
      });
    };

    $scope.view = function(customerId) {
      var modalAside = $aside.open({
        templateUrl: 'app/customer/customer.modal.view.html',
        placement: 'right',
        size: 'md',
        backdrop: true,
        controller: 'ViewCustomerModalCtrl',
        resolve: {
          customerId: function () {
            return customerId;
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
  .controller('CreateCustomerModalCtrl', function ($scope, $uibModalInstance, $cookieStore, Building, Customer) {

  $scope.customer = {};
  $scope.contacts = [];

  var cookieBuilding = $cookieStore.get('Building');

  $scope.create = function (form) {
    if(form.$valid) {
      Customer.save({
        name:            $scope.customer.name,
        tradename:       $scope.customer.tradename,
        rfc:             $scope.customer.rfc,
        address:         $scope.customer.address,
        neiborhood:      $scope.customer.neiborhood,
        zipCode:         $scope.customer.zipCode,
        city:            $scope.customer.city,
        state:           $scope.customer.state,
        country:         $scope.customer.country,
        representative:  $scope.customer.representative,
        email:           $scope.customer.email,
        currency:        $scope.customer.currency,
        contacts:        $scope.contacts,
        building:        cookieBuilding
      })
      .$promise.then(function (customer) {

        return Building.get({ id: cookieBuilding })
        .$promise.then(function (building) {
          building.customers.push(customer);
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

        return Customer.getBuildingCustomers({ id: building._id })
        .$promise.then(function (customers) {
          $uibModalInstance.close(customers);
        });
      })
      .catch(function(err) {
        if(err) console.log(err);
      });
    }
  };

  $scope.addContact = function() {
    $scope.contacts.push({});
  };

  $scope.clearContacts = function() {
    $scope.contacts = [];
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


angular.module('inmobiliariaApp')
  .controller('EditCustomerModalCtrl', function ($scope, $uibModalInstance, $cookieStore, customerId, Building, Customer) {
  var customers  = [];
  var cookieBuilding = $cookieStore.get('Building');
  var cookieCompany  = $cookieStore.get('Company');

  Customer.get({ id: customerId }, function(customer){
    $scope.customer = customer;
    $scope.contacts = customer.contacts;
  });

  $scope.edit = function(form){
    if(form.$valid) {
      Customer.update({ id: $scope.customer._id }, {
        name:            $scope.customer.name,
        tradename:       $scope.customer.tradename,
        rfc:             $scope.customer.rfc,
        address:         $scope.customer.address,
        neiborhood:      $scope.customer.neiborhood,
        zipCode:         $scope.customer.zipCode,
        city:            $scope.customer.city,
        state:           $scope.customer.state,
        country:         $scope.customer.country,
        representative:  $scope.customer.representative,
        currency:        $scope.customer.currency,
        email:           $scope.customer.email,
        contacts:        $scope.contacts,
      })
     .$promise.then(function () {
        if (cookieBuilding) {
          return Customer.getBuildingCustomers({ id: cookieBuilding })
            .$promise.then(function (customers) {
              $uibModalInstance.close(customers);
          });
        }
        else {
          return Building.getCompanyCustomers({ id: cookieCompany })
            .$promise.then(function (buildings) {
              buildings.forEach(function (building) {
                building.customers.forEach(function (customer) {
                  customers.push(customer);
                });
              });
            $uibModalInstance.close(customers);
          });
        }
      })
      .catch(function(err) {
        if(err) console.log(err);
      });
    }
  };

  $scope.addContact = function() {
    $scope.contacts.push({});
  };

  $scope.clearContacts = function() {
    $scope.contacts = [];
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


angular.module('inmobiliariaApp')
  .controller('ViewCustomerModalCtrl', function ($scope, $uibModalInstance, $cookieStore, customerId, Customer) {

  Customer.get({ id: customerId }, function (customer) {
    $scope.customer = customer;
  });

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
