'use strict';

angular.module('inmobiliariaApp')
  .controller('NewBuildingModalCtrl', function ($scope, $uibModalInstance, $cookieStore, Company, Building) {

  $scope.building = {};
  $scope.cookieBuilding = $cookieStore.get('Building');
  $scope.cookieCompany = $cookieStore.get('Company');

  $scope.create = function (form) {

    if(form.$valid) {

      Building.save({
        name: $scope.building.name,
        company: $scope.cookieCompany
      })
      .$promise.then(function (building) {
        $cookieStore.put('Building', building._id);

        return Company.get({ id: building.company })
          .$promise.then(function (company) {
            company.buildings.push(building);
            return company;
        });
      })
      .then(function (company) {
        return Company.update({ id: company._id }, company)
          .$promise.then(function (company) {
            var result = {
              building: $scope.building,
              buildings:  company.buildings
            }
            $uibModalInstance.close(result);
        });
      })
      .catch(function (err) {
        if(err) console.log(err);
      });
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
