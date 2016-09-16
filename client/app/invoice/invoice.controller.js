'use strict';

angular.module('inmobiliariaApp')
  .controller('InvoiceCtrl', function($scope, $cookieStore, $aside, Company, Building) {

    $scope.invoice = {};
    $scope.invoices = [];
    $scope.customers = [];

    //var cookieBuilding  = $cookieStore.get('Building');
    var cookieCompany = $cookieStore.get('Company');

    if (cookieCompany) {
      Building.getCompanyCustomers({
          id: cookieCompany
        })
        .$promise.then(function(buildings) {
          buildings.forEach(function(building) {
            building.customers.forEach(function(customer) {
              $scope.customers.push(customer);
            });
          });
        });
    }

    // if (cookieBuilding) {
    //   // Building.getBuildingCustomers({
    //   //   id: $scope.cookieBuilding
    //   // }).$promise.then(function(building) {
    //   //   $scope.customers = building.customers;
    //   // });
    //   // Company.getCompanyInvoices({
    //   //   id: $scope.cookieCompany
    //   // }).$promise.then(function(company) {
    //   //   $scope.invoices = company.invoices;
    //   // });
    // }
    // $scope.filter = function() {

    //   Company.getCompanyInvoices({ id: $scope.cookieCompany }).$promise.then(function() {
    //     $location.path('/main');
    //   }, function(err) {
    //     // fail
    //     console.log(err);
    //   });
    // };


    // $scope.create = function() {
    //   var modalAside = $aside.open({
    //     templateUrl: 'app/invoice/invoice.modal.new.html',
    //     placement: 'right',
    //     size: 'lg',
    //     backdrop: true,
    //     controller: 'NewInvoiceModalCtrl',
    //     resolve: {
    //       customers: function() {
    //         return $scope.customers;
    //       }
    //     }
    //   });

    //   modalAside.result.then(function() {
    //     //on ok button press
    //   }, function() {
    //     //on cancel button press
    //     console.log('Modal Closed');
    //   });

    // };


    // $scope.consecutive = function() {
    //   $scope.asideState = {
    //     open: true,
    //     position: 'right'
    //   };

    //   function postClose() {
    //     $scope.asideState.open = false;
    //   }

    //   $aside.open({
    //     templateUrl: 'app/invoice/invoice.modal.consecutive.html',
    //     placement: 'right',
    //     size: 'lg',
    //     backdrop: true,
    //     controller: function($scope, $uibModalInstance) {
    //       $scope.ok = function(e) {
    //         $uibModalInstance.close();
    //         e.stopPropagation();
    //       };
    //       $scope.cancel = function(e) {
    //         $uibModalInstance.dismiss();
    //         e.stopPropagation();
    //       };
    //     }
    //   }).result.then(postClose, postClose);
    // };

  });


// angular.module('inmobiliariaApp')
//   .controller('NewInvoiceModalCtrl', function($scope, $uibModalInstance, $cookieStore, customers, Invoice, Company) {

//     $scope.movements = [];
//     $scope.movement = {};
//     $scope.invoice = {
//       amount: 0,
//       tax: 0,
//       total: 0
//     };
//     $scope.customers = customers;

//     $scope.cookieCompany = $cookieStore.get('Company');

//     $scope.newMovement = function() {
//       $scope.movements.push($scope.movement);
//       $scope.invoice.amount = $scope.invoice.amount + $scope.movement.amount;
//       $scope.invoice.tax = $scope.invoice.tax + ($scope.movement.amount * 0.16);
//       $scope.invoice.total = $scope.invoice.total + ($scope.movement.amount + ($scope.movement.amount * 0.16));
//       $scope.movement = {};
//     };

//     // Invoice
//     $scope.create = function(form) {
//       Invoice.save({
//           serie: 'A',
//           folio: $scope.invoice.folio,
//           amount: $scope.invoice.amount,
//           tax: $scope.invoice.tax,
//           total: $scope.invoice.total,
//           seal_date: $scope.invoice.seal_date,
//           cancel_date: $scope.invoice.cancel_date,
//           currency: $scope.invoice.currency,
//           uudi: $scope.invoice.uudi,
//           movements: $scope.movements,
//           customer: $scope.invoice.customer,
//           company: $scope.cookieCompany
//         })
//         .$promise.then(function(invoice) {

//           Company.get({
//             id: $scope.cookieCompany
//           }, function(company) {
//             company.invoices.push(invoice);

//             Company.update({
//               id: $scope.cookieCompany
//             }, company, function(company) {

//               Company.getCompanyInvoices({
//                 id: company._id
//               }, function(company) {
//                 $uibModalInstance.close(company);
//               });
//             });
//           });
//         });
//     };

//     $scope.ok = function() {
//       $uibModalInstance.close();
//     };

//     $scope.cancel = function() {
//       $uibModalInstance.dismiss();
//     };
//   });
