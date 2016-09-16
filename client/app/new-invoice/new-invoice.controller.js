'use strict';

angular.module('inmobiliariaApp')
  .controller('NewInvoiceCtrl', function($scope, $cookieStore, $uibModal, $aside, Customer, Building) {
    
    var cookieBuilding   = $cookieStore.get('Building');
    var cookieCompany    = $cookieStore.get('Company');
    
    $scope.customers     = [];
    $scope.sortType      = 'building.name';
    $scope.sortReverse   = false;
    $scope.searchFilter  = '';
    $scope.checkboxModel = false;

    function sumContracts(customers) {
      var result = [];
      customers.forEach(function(customer) {
        customer.monthlyRent    = 0;
        customer.maintenanceFee = 0;
        customer.checkbox = false;
        customer.contracts.forEach(function(contract) {
          customer.monthlyRent    += contract.monthlyRent;
          customer.maintenanceFee += contract.maintenanceFee;
          customer.taxRate        =  contract.taxRate;
        });
        result.push(customer);
      });
      return result;
    }

    // if (cookieBuilding) {
    //   Customer.getBuildingCustomers({
    //       id: cookieBuilding
    //     })
    //     .$promise.then(function(customers) {
    //       $scope.customers = sumContracts(customers);
    //   });
    // } else {
    if (cookieCompany) {
      Building.getCompanyCustomers({
          id: cookieCompany
        })
        .$promise.then(function(buildings) {
          buildings.forEach(function(building) {
            var customers = sumContracts(building.customers);
            customers.forEach(function(customer) {
              $scope.customers.push(customer);
            });
          });
        });
    }

    $scope.selectAll = function($event) {
      var checkbox = $event.target.checked;
      $scope.customers.forEach(function (customer, index){
        $scope.customers[index].checkbox = checkbox;
      })
    };

    $scope.consecutive = function () {
      var modalInstance = $uibModal.open({
        animation   : true,
        templateUrl : 'app/new-invoice/new-invoice.modal.consecutive.html',
        controller  : 'ConsecNewInvoiceModalCtrl',
        size        : 'md',
        resolve     : {
          customers: function() {
            return $scope.customers;
          }
        }
      });

      modalInstance.result.then(function () {
        //on create button press
      }, function () {
        //on cancel button press
        console.log('Modal Closed');
      });
    };


    $scope.create = function() {
      var modalAside = $aside.open({
        templateUrl : 'app/new-invoice/new-invoice.modal.create.html',
        placement   : 'right',
        size        : 'lg',
        backdrop    : true,
        controller  : 'CreateNewInvoiceModalCtrl',
        resolve     : {
          customers: function() {
            return $scope.customers;
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
  .controller('CreateNewInvoiceModalCtrl', function($scope, $uibModalInstance, $cookieStore, customers, Invoice, Company) {

    $scope.movements = [];
    $scope.movement  = {};
    //$scope.movement.concept = 'Pago correspondiente al mes de ..';
    $scope.invoice   = {
      amount : 0,
      tax    : 0,
      total  : 0
    };
    $scope.customers = customers;

    var cookieCompany = $cookieStore.get('Company');

    $scope.newMovement = function() {
      $scope.movements.push($scope.movement);

      $scope.invoice.amount = $scope.invoice.amount + $scope.movement.amount;
      $scope.invoice.tax    = $scope.invoice.tax + ($scope.movement.amount * 0.16);
      $scope.invoice.total  = $scope.invoice.total + ($scope.movement.amount + ($scope.movement.amount * 0.16));
      $scope.movement       = {};
    };

    // Invoice
    $scope.create = function(form) {
      Invoice.save({
          serie       : 'A',
          folio       : $scope.invoice.folio,
          amount      : $scope.invoice.amount,
          tax         : $scope.invoice.tax,
          total       : $scope.invoice.total,
          seal_date   : $scope.invoice.seal_date,
          cancel_date : $scope.invoice.cancel_date,
          currency    : $scope.invoice.currency,
          uudi        : $scope.invoice.uudi,
          movements   : $scope.movements,
          customer    : $scope.invoice.customer,
          company     : cookieCompany
        })
        .$promise.then(function(invoice) {

          return Company.get({
              id: cookieCompany
            })
            .$promise.then(function(company) {
              company.invoices.push(invoice);
              return company;
            });
        })
        .then(function(company) {

          return Company.update({
              id: company._id
            }, company)
            .$promise.then(function(company) {
              $uibModalInstance.close();
            });
        })
        .catch(function(err) {
          if (err) console.log(err);
        });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });

angular.module('inmobiliariaApp')
  .controller('ConsecNewInvoiceModalCtrl', function($scope, $cookieStore, $uibModalInstance, customers, Company, Invoice) {
    
    var cookieCompany = $cookieStore.get('Company');

    $scope.movements = [];
    $scope.consecutive = {};
    $scope.consecutive.monthlyRent    = 'Pago de renta mensual correspondiente al mes de ..';
    $scope.consecutive.maintenanceFee = 'Pago de mantenimiento correspondiente al mes de ..';
    $scope.invoice = {};

    $scope.create = function(form) {

      customers.forEach(function(customer) {

        if (customer.checkbox == true && customer.monthlyRent > 0 && customer.maintenanceFee > 0) {

          $scope.movements = [{
            quantity : 1,
            concept  : $scope.consecutive.monthlyRent,
            amount   : customer.monthlyRent
          }, {
            quantity : 1,
            concept  : $scope.consecutive.maintenanceFee,
            amount   : customer.maintenanceFee
          }];

          $scope.invoice = {
            amount : customer.monthlyRent + customer.maintenanceFee,
            tax    : (customer.monthlyRent + customer.maintenanceFee) * customer.taxRate / 100,
            total  : (customer.monthlyRent + customer.maintenanceFee) + ((customer.monthlyRent + customer.maintenanceFee) * customer.taxRate / 100),
          };

          Invoice.save({
              serie       : 'A',
              folio       : $scope.folio,
              amount      : $scope.invoice.amount,
              tax         : $scope.invoice.tax,
              total       : $scope.invoice.total,
              seal_date   : $scope.invoice.seal_date,
              cancel_date : $scope.invoice.cancel_date,
              currency    : $scope.invoice.currency,
              uudi        : $scope.invoice.uudi,
              movements   : $scope.movements,
              customer    : customer,
              company     : cookieCompany
            })
            .$promise.then(function(invoice) {

              return Company.get({
                  id: cookieCompany
                })
                .$promise.then(function(company) {
                  company.invoices.push(invoice);
                  return company;
                });
            })
            .then(function(company) {

              return Company.update({
                  id: company._id
                }, company)
                .$promise.then(function(company) {
                  $uibModalInstance.close();
                });
            })
            .catch(function(err) {
              if (err) console.log(err);
            });
        } //end if
      }); //end foreach
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });